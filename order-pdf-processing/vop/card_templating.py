from docxtpl import DocxTemplate, InlineImage
from docx.shared import Mm
from datetime import date, timedelta
from pathlib import Path
import pandas
import logging
from PIL import Image as PILImage, ImageDraw
from io import BytesIO
from docx.image.exceptions import UnrecognizedImageError
logger = logging.getLogger(__name__)

from vop.helpers import load_config
from vop import dirs


def populate_template(customer: dict, blend: pandas.DataFrame, directory:Path):
    cfg = load_config()

    if isinstance(customer, pandas.Series):
        customer = customer.to_dict()
    
    logger.info(f"Starting template population for customer {customer['first_name']} {customer['last_name']}")

    template_path = dirs.template_dir / "template.docx"  # Template path
    doc = DocxTemplate(template_path)   # Load template
    context = customer  # Create context from customer dictionary

    # Set the image height based on the number of elements in the blend and max allowed image height
    try:
        img_height = cfg['templating']['max_table_height'] / len(blend.index)
        img_height = cfg['templating']['max_image_height'] if img_height > cfg['templating']['max_image_height'] else img_height
    except ZeroDivisionError:
        img_height = cfg['templating']['max_image_height']

    blend = blend_add_inline_image(blend=blend, tpl=doc, img_height=img_height)
    context["blend"] = blend # Add blend list to the context under key 'blend'

    context["expiry_date"] = (date.today() + timedelta(days=cfg['data_handling']['expiry_date_delta'])).\
        strftime("%d-%m-%Y")   # Add expiry date to context based on today's date and offset
    
    doc.render(context) # Render the context into the template document

    # Construct the destination file path
    destination_file = (directory/str(customer[cfg['data_handling']['naming_field']])).with_suffix(".docx")

    # Save the file
    with open(destination_file, "w") as outfile:
        doc.save(destination_file)

    if document_ok(destination_file):
        logger.info(f"Saved docx to {destination_file}")
    else:
        logger.error(f"Was not able to save file to docx at {destination_file}!")
        #TODO: Maybe even notify someone in some way
        pass
    return destination_file

def blend_add_inline_image(blend: list, tpl: DocxTemplate, img_height: float = None, img_width: float = None):
    """
    This function will loop over a list of dictionaries where each row represents a supplement. 
    For each supplement, it will construct the path to the corresponding image and create an inline image.
    This inline image is added to the dictionary. The images are assumed to be in /data/images and the image
    file names are assumed to be <ingredient_id>.png

        Parameters:
            blend (DataFrame): Dataframe of the blend
            tpl (DocxTemplate): DocxTemplate that the image will be rendered into
            img_height (float): Optional image height in mm
            img_width (float): Optional image width in mm
    """
    img_height = Mm(img_height) if img_height else None
    imge_width = Mm(img_width) if img_width else None
    if isinstance(blend, pandas.DataFrame):
        blend = blend.to_dict("records")
    elif blend is None:
        return []

    def to_png_bytes(src_path: Path) -> BytesIO:
        """Open image, normalize to RGB PNG, and return as BytesIO."""
        bio = BytesIO()
        with PILImage.open(src_path.as_posix()) as im:
            if im.mode not in ("RGB", "L"):
                im = im.convert("RGB")
            im.save(bio, format="PNG")
        bio.seek(0)
        return bio

    def placeholder_path(stem: str) -> str:
        """Generate a simple PNG placeholder on disk and return its path."""
        cache_dir = dirs.img_dir / "_cache"
        cache_dir.mkdir(exist_ok=True)
        dst_path = cache_dir / f"{stem}_placeholder.png"
        img = PILImage.new("RGB", (600, 600), color=(230, 230, 230))
        d = ImageDraw.Draw(img)
        d.text((20, 280), stem, fill=(80, 80, 80))
        img.save(dst_path.as_posix(), format="PNG")
        return dst_path.as_posix()

    def normalize_to_cache_path(src_path: Path, stem: str) -> str:
        """Open image, normalize to RGB PNG, save to cache, return path."""
        cache_dir = dirs.img_dir / "_cache"
        cache_dir.mkdir(exist_ok=True)
        dst_path = cache_dir / f"{stem}.png"
        with PILImage.open(src_path.as_posix()) as im:
            if im.mode not in ("RGB", "L"):
                im = im.convert("RGB")
            im.save(dst_path.as_posix(), format="PNG")
        return dst_path.as_posix()

    def resolve_image_path(stem: str) -> str:
        """Return a cache PNG path for stem (.png/.jpg/.jpeg), else generated placeholder path."""
        candidates = [
            (dirs.img_dir / f"{stem}.png"),
            (dirs.img_dir / f"{stem}.jpg"),
            (dirs.img_dir / f"{stem}.jpeg"),
        ]
        for p in candidates:
            if p.is_file():
                try:
                    return normalize_to_cache_path(p, stem)
                except Exception:
                    continue
        return placeholder_path(stem)

    for supplement in blend:    # Loop over blends
        img_name = supplement['strapi_content_id']  # Get image name stem
        img_path = resolve_image_path(str(img_name))
        try:
            image = InlineImage(tpl, img_path, width=imge_width, height=img_height)
        except UnrecognizedImageError:
            logger.warning("Unrecognized image format on disk cache, falling back to generated placeholder")
            fb = placeholder_path("placeholder")
            image = InlineImage(tpl, fb, width=imge_width, height=img_height)
        supplement['img'] = image   # Add to dictionary
    return blend

def document_ok(path: Path):
    """
    This function will check whether a file exists at the provided path and whether the file size
    is at least 1000 bytes
    #TODO: Could be even nicer to open the file and confirm that the customer's name is in the document
    """
    if path.exists() and path.is_file():
        size = path.stat().st_size
        if size > 1000:
            return True
    return False
