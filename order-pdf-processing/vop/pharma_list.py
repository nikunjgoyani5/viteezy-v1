from vop import data_feed
from vop import helpers

def gen_packing_list(pharma_order_number:str, filters=None, limit=None):
    df = data_feed.get_joined_order_blend(filters=filters, limit=limit)  # Get dataframe of orders and blends joined. Row per blend item
    inventory = helpers.load_inventory()    # Get inventory
    merged = data_feed.merge_blend_inventory(df, inventory)  # Merge inventory with blend data
    mapping = helpers.load_config()['packing_list']['column_mapping'] # Get packing list mapping from the configuration
    merged = merged.rename(columns = mapping)   # Use mapping to rename the columns

    # Grab only the rows where is_pil == True and grab only the columns from the mapping list 
    packing_list = merged[merged['is_pill'] == True][list(mapping.values())]
    packing_list["Stuks"] = 1   # Stuks hardcoded to 1 (amount of the same pills)
    packing_list["Ordernummer"] = pharma_order_number   # Ordernumber from the pharma_order_number

    return packing_list