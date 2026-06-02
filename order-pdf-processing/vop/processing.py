from datetime import date, datetime
from pathlib import Path
from PIL import Image
from rich.progress import track
import requests
import urllib.request
import logging
import os

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)


from vop import card_templating, data_feed, helpers, pharma_list, sftp, dirs
import pandas as pd

# --- Simple .env loader (no external dependency) ---
def _load_dotenv():
    """Load environment variables from a .env file if present.

    Search order:
    1) Current working directory
    2) vop data directory (dirs.data_dir) when available
    """
    candidates = [Path.cwd() / ".env"]
    try:
        candidates.append(dirs.data_dir / ".env")
    except Exception:
        pass

    for env_path in candidates:
        if env_path and env_path.is_file():
            try:
                with open(env_path, "r", encoding="utf-8") as fp:
                    for line in fp:
                        line = line.strip()
                        if not line or line.startswith("#"):
                            continue
                        if "=" not in line:
                            continue
                        key, val = line.split("=", 1)
                        key = key.strip()
                        val = val.strip().strip('"').strip("'")
                        if key and key not in os.environ:
                            os.environ[key] = val
            except Exception:
                # best-effort only
                pass

def process(process_all=False, update_db=False, transfer_files=True, demo: bool = False) -> list:
    _load_dotenv()
    if demo:
        return process_demo()
    if not process_all:
        return process_once(update_db=update_db, transfer_files=transfer_files)
    else:
        has_data, _ = data_feed.orders_available()
        orders = []
        while has_data:
            orders.append(process_once(update_db=update_db, transfer_files=transfer_files))
            has_data, _ = data_feed.orders_available()
        return [item for subitem in orders for item in subitem]

def process_once(update_db=False, transfer_files=True) -> list:
    _load_dotenv()
    # Check if inventory is valid
    logging.info("Starting processing")
    if not helpers.inventory_valid():
        logger.error("Inventory .yaml is not valid! Terminating")
        raise ValueError(f"Inventory .yaml not valid!")

    cfg = helpers.load_config()
    try:
        url = os.environ.get('STRAPI_HOST') + "/strapi/api/productpages?populate=deep"
        headers = {"Content-Type": "application/json", "Authorization": "Bearer " + os.environ.get('STRAPI_ACCESS_TOKEN')}
        response = requests.get(url, headers=headers)

        raw_json = response.json()
        data = raw_json.get("data") or []

        for ingredient in data:
            pdf_image = ingredient.get("attributes", {}).get("pdfImage", {}).get("data")
            if pdf_image:
                img_url = os.environ.get("STRAPI_HOST") + pdf_image["attributes"]["url"]
                img_name = Path(pdf_image["attributes"]["url"]).name
                img_path = (dirs.img_dir / img_name).as_posix()
                urllib.request.urlretrieve(img_url, img_path)
                image = Image.open(img_path)
                image.save((dirs.img_dir / str(ingredient["id"])).with_suffix(".png").as_posix())
    except Exception:
        logging.exception("Strapi image sync failed with exception")

    splits = cfg['splitting']
    docx_list = []
    order_ids = []
    for split in splits:
        name = split["name"].lower().replace(" ","-")
        logging.info(f"Processing for split {name}")
        limit = split["limit"]
        filters = split["filters"]
        orders = data_feed.get_orders(filters=filters, limit=limit)
        n_orders = len(orders.index)
        logging.info(f"Found {n_orders} orders")
        if n_orders == 0:
            continue

        # Process and create pharma list
        logging.info(f"Generating pharma order list")
        pharma_order_number = helpers.generate_pharma_number()
        root_dir = helpers.initiate_folder_structure(pharma_order_number)
        #pharma_table = pharma_list.gen_packing_list(pharma_order_number=pharma_order_number, filters=filters, limit=limit)
        #line_terminator = cfg['packing_list']['line_terminator']
        #pharma_table.to_csv((root_dir/pharma_order_number).with_suffix(".csv"), encoding="utf-8", line_terminator=line_terminator, index=False)

        # Process and create docx files
        logging.info(f"Starting docx creation")
        for _, row in orders.iterrows():
            inventory = {}
            ingredients = data_feed.get_ingredients_by_id(row['blend_id'])[['id', 'name', 'type', 'strapi_content_id']]

            for _, ingredient in ingredients.iterrows():
                ingredient_components = []
                for _, ingredient_component in data_feed.get_ingredient_components(ingredient['id']).iterrows():
                    ingredient_components.append({'name': ingredient_component['name'], 'amount': ingredient_component['amount'], 'perc': ingredient_component['percentage']})
                ingredient['components'] = ingredient_components

                # misspelled but adjusting template.docx is a problem so for the moment
                ingredient_content = data_feed.get_ingredient_content(ingredient['id'])
                ingredient['excepients'] = ingredient_content['excipients'].values[0] if len(ingredient_content['excipients']) > 0 else None
                ingredient['has_excepients'] = ingredient['excepients'] is not None and len(ingredient['excepients']) > 0

                inventory[str(ingredient['id'])] = ingredient.to_dict()
            blend = data_feed.get_blend_by_id(row['blend_id'], inventory, with_inventory=True)

            try:
                destination_file = card_templating.populate_template(row, blend, root_dir / "doc")
                docx_list.append(destination_file)
                order_ids.append(row['id'][0])
            except Exception:
                data_feed.update_order_status(row['id'][0], None, "ERROR_PDF_TEMPLATE")

        info = {
            "name": name,
            "Created": datetime.now().isoformat(),
            "filters": filters,
            "limit": limit, 
            "Number of orders": n_orders
            }
        helpers.save_yaml(info, root_dir / "info.yaml")

    # Convert all the files in the docx list
    logging.info("Starting DOCX to PDF conversion")
    pdf_list = [(x.parents[1] / "pdf" / x.name).with_suffix(".pdf") for x in docx_list]
    # Lazy import to avoid uno/LibreOffice dependency in demo/local runs
    from vop.pdf_conversion import batch_convert
    batch_convert(sources=docx_list, destinations=pdf_list)

    # Transfer the files using SFTP
    if transfer_files:
        logging.info("Preparing to transfer PDFs using sftp")
        # Getting settings from config.yaml
        hostname = os.environ.get('SFTP_HOST')
        username = os.environ.get('SFTP_USERNAME')
        password = cfg['sftp_delivery']['password']
        private_key = Path(os.environ.get('SFTP_PRIVATE_KEY')) if os.environ.get('SFTP_PRIVATE_KEY') else None
        port = cfg['sftp_delivery']['port']
        # IMPORTANT: `pdf_folder` must be relative on the SFTP server.
        # If config sets "/PDF", a leading "/" would target the chroot root (often invalid).
        pdf_folder_cfg = str(cfg['sftp_delivery'].get('pdf_folder') or "PDF").lstrip("/")
        pdf_folder = PurePosixPath(pdf_folder_cfg)

        # Starting client
        client = sftp.ConParamiko(hostname=hostname, 
                                username=username,
                                password=password,
                                private_key=private_key,
                                port=port)
        
        success_count = 0
        # Transfering files
        for file in track(pdf_list, description="Copying files to remote..."):
            remote_path = (pdf_folder / file.name).with_suffix(".pdf")
            client.put_file(file, remote_path)
            if not client.remote_file_exists(remote_path):
                logging.error(f"File {file} not successfully transferred using sftp!")
            else:
                success_count += 1
            logging.info(f"Transferred {success_count}/{len(pdf_list)} files")
        client.close()


    # Update database
    if update_db:
        logging.info("Updating MariaDB database")
        [data_feed.update_order_status(id) for id in order_ids]
    return order_ids


def process_demo() -> list:
    _load_dotenv()
    """Demo mode: generate a single DOCX (and info.yaml) without DB/SFTP/PDF.

    - Uses placeholder image if ingredient image is not present
    - Skips PDF conversion and SFTP transfer
    - Does not touch the database
    """
    logging.info("Starting demo processing")
    if not helpers.inventory_valid():
        logger.warning("Inventory not strictly valid; proceeding with demo anyway")

    # Prepare output folder
    pharma_order_number = helpers.generate_pharma_number()
    root_dir = helpers.initiate_folder_structure(pharma_order_number)

    # Minimal fake customer compatible with template usage
    customer = {
        "first_name": "Demo",
        "last_name": "User",
        "email": "demo@example.com",
        "city": "Demo City",
        "postcode": "0000",
        "order_number": f"{pharma_order_number}",
        "id": [0],  # align with potential indexing in downstream code
        "blend_id": "demo-blend"
    }

    # Minimal blend with components; set strapi_content_id values to expected filenames
    # You can drop PNGs into C:\data\images named 33.png, 4.png, 19.png to see real images
    blend_rows = [
        {
            "id": 33,
            "name": "Hair Nail Boost",
            "type": "Capsule",
            "strapi_content_id": "33",
            "components": [
                {"name": "Biotine", "amount": "3mg", "perc": "6%"}
            ],
            "excepients": "",
            "has_excepients": False,
        },
        {
            "id": 4,
            "name": "Vitamine D3",
            "type": "Softgel",
            "strapi_content_id": "4",
            "components": [
                {"name": "Vitamine D3", "amount": "75mcg", "perc": "1500%"}
            ],
            "excepients": "",
            "has_excepients": False,
        },
        {
            "id": 19,
            "name": "Visolie",
            "type": "Softgel",
            "strapi_content_id": "19",
            "components": [
                {"name": "EPA", "amount": "165mg", "perc": "**"}
            ],
            "excepients": "",
            "has_excepients": False,
        }
    ]
    blend_df = pd.DataFrame(blend_rows)

    # Create DOCX
    destination_file = card_templating.populate_template(customer, blend_df, root_dir / "doc")

    # Save info.yaml
    info = {
        "name": "demo",
        "Created": datetime.now().isoformat(),
        "filters": ["demo"],
        "limit": 1,
        "Number of orders": 1,
    }
    helpers.save_yaml(info, root_dir / "info.yaml")

    logging.info("Demo processing completed")
    return [customer["id"][0]]