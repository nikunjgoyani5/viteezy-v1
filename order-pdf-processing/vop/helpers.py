from ruamel.yaml import YAML
from datetime import date
import os, shutil
import logging
logger = logging.getLogger(__name__)

from vop import dirs

def load_config():
    yaml = YAML()
    return yaml.load(dirs.data_dir/"config.yaml")

cfg = load_config()

def save_yaml(cfg, dir):
    yaml = YAML()
    yaml.dump(cfg, dir)

def save_config(cfg):
    yaml = YAML()
    yaml.dump(cfg,dirs.data_dir/"config.yaml")

def load_inventory():
    yaml = YAML()
    inventory = yaml.load(dirs.data_dir / "inventory.yaml")
    for key, value in inventory.items():
        inventory[key]['has_excepients'] = len(value['excepients']) > 0
        inventory[key]['has_coating'] = len(value['coating']) > 0
    return inventory

def generate_pharma_number():
    """
    Helper function to generate the pharmacy order number based on the folders currently existing
    in the data/output directory. Order number is named according to O<ddmmyy><NNN> where ddmmyy is the 
    today's date and NNN is an incrementing number which resets every day.
    """
    # Get Today's date and format it to ddmmyy
    today_str = date.today().strftime("%d%m%y")
    # Grab all subdirectories that contain today's date in the folder name
    today_subdirs = [f for f in dirs.out_dir.iterdir() if f.is_dir() and today_str in f.name]
    # Calculate the highest number already existing in the folder structure
    max_num = max([int(subdir.name[7:]) for subdir in today_subdirs]) if today_subdirs else 0
    return f"O{today_str}{str(max_num+1).zfill(3)}" # Generate next order number

def initiate_folder_structure(folder_name: str):
    root_dir = dirs.out_dir / folder_name
    root_dir.mkdir(exist_ok=False)
    (root_dir / "doc").mkdir()
    (root_dir / "pdf").mkdir()

    return root_dir

def inventory_valid() -> bool:
    """
    Check if the inventory.yaml is valid by ensuring that each supplement entry has the required keys.
    Provides an informative error message for each missing key and returns True if the entire inventory is valid
    """
    logger.info("Checking if inventory is valid")
    # Define mandatory keys
    mandatory_keys = ["name", "type", "packing_id", "is_flavour", "is_pill", "description", "components", "excepients", "coating"]
    inventory = load_inventory()    # Load inventory
    is_valid = True # Initially is valid = True
    for key, value in inventory.items():    # loop through each supplement
        has_keys = [name in value for name in mandatory_keys]   # Confirm if the keys exist
        missing = [x for x, y in zip(mandatory_keys, has_keys) if y == False]   # Make overview of missing keys
        if missing: # If missing keys
            logger.error(f"{key} missing parameters {missing}")
            is_valid = False    # Set is_valid to false
    return is_valid

def clear_folder(path):
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            logger.error('Failed to delete %s. Reason: %s' % (file_path, e))
