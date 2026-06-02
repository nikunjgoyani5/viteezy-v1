from sqlite3 import OperationalError
import pandas
import sqlalchemy
import os
import logging
logger = logging.getLogger(__name__)


from vop import helpers

def engine_from_config():
    cfg = helpers.load_config()
    db = cfg['database']

    engine = mysql_engine(host=os.environ.get('DATABASE_HOST'),
                          user=os.environ.get('DATABASE_USERNAME'),
                          password=os.environ.get('DATABASE_PASSWORD'),
                          database=db['database'],
                          port=db['port'])
    
    try:
        engine.connect()
    except OperationalError as err:
        logging.error(f"Unable to connect to MariaDB with settings: {db}")
        logging.error(err)
        raise OperationalError
    return engine

def build_query(base: str, filters: list = None, limit:int=None):
    """
    Builds an SQL query string based on a base query, a list of filters and a limit

        Parameters:
            base (str): The base part of the query (everything before the WHERE statement)
            filters (list(str)): List of strings used as query filters
            limit (int): Number to limit the amount of items returned by the query
    """
    # Combine the filters into a single query string or none if no filters were passed
    filter_str = " WHERE " + " AND ".join(filters) if filters else ""
    # Create the limit query string from the provided limit or non if no limit was passed
    limit_str = f" LIMIT {limit}" if limit else ""
    # Combine into complete query string
    query = f"{base}{filter_str}{limit_str};"
    return query


def mysql_engine(host: str, user: str, password: str, database: str, port: str = "3306"):
    cfg = helpers.load_config()
    connection_string = f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"
    engine = sqlalchemy.create_engine(connection_string, echo=cfg['debug'])
    #TODO: Some mechanism to check if we can connect using engine.connect() and handle exceptions if not
    return engine

def get_orders(engine = None,filters:list=None, limit:int=None):
    """
    Returns a pandas dataframe with all orders that have to be processed.
    It returns all columns present in the orders table. 
    It selects the rows where status == CREATED

        Parameters:
            engine (sqlalchemy.Engine): Engine object that can connect to a database
            filters (list(str)): List of strings used as query filters
            limit (int): Number to limit the amount of items returned by the query

        Returns:
            df (pandas.DataFrame): Data frame with orders

    """
    engine = engine_from_config() if not engine else engine
    base = """
    SELECT * from orders
    INNER JOIN payments on orders.payment_id = payments.id
    """
    query = build_query(base, filters, limit)
    return pandas.read_sql(query,engine)


def get_order_by_id(order_id, engine=None):
    """
    Returns a single order as a one-row dataframe (same shape as get_orders).
    Use this to generate an insert PDF for any order regardless of status,
    e.g. for an order already in SHIPPED_TO_PHARMACIST.

        Parameters:
            order_id (int): Order id (orders.id)
            engine (sqlalchemy.Engine): Optional engine

        Returns:
            df (pandas.DataFrame): One-row dataframe with order + payment columns, or empty
    """
    order_id = int(order_id)
    return get_orders(engine=engine, filters=[f"orders.id = {order_id}"], limit=1)

def get_all_blends(engine=None):
    """
    Returns a pandas dataframe with all blends belonging to orders that have to be processed.
    It returns all columns present in the blends table. 
    It selects the rows where orders status == CREATED

        Parameters:
            engine (sqlalchemy.Engine): Engine object that can connect to a database

        Returns:
            df (pandas.DataFrame): Data frame with blends
    """
    engine = engine_from_config() if not engine else engine
    query = f'''
    SELECT bir.* from orders
    INNER JOIN blend_ingredients_relations bir on orders.blend_id = bir.blend_id 
    WHERE status = 'CREATED';
    '''
    return pandas.read_sql(query, engine)

def get_blend_by_id(blend_id, inventory, engine=None, with_inventory=False):
    """
    Returns a pandas dataframe with all entries belonging to a certain blend_id

        Parameters:
            engine (sqlalchemy.Engine): Engine object that can connect to a database

        Returns:
            df (pandas.DataFrame): Data frame with blends
    """
    engine = engine_from_config() if not engine else engine
    query = f"""
        SELECT * FROM blend_ingredients_relations WHERE blend_id = '{blend_id}' AND is_unit != "UNITLESS";
    """
    blend = pandas.read_sql(query, engine)
    return merge_blend_inventory(blend, inventory) if with_inventory else blend

def get_ingredients_by_id(blend_id):
    engine = engine_from_config()
    query = f"""
        SELECT ingredients.* FROM blend_ingredients_relations 
        INNER JOIN ingredients ON blend_ingredients_relations.ingredient_id=ingredients.id 
        WHERE blend_id = '{blend_id}' AND blend_ingredients_relations.is_unit != "UNITLESS";
    """
    ingredients = pandas.read_sql(query, engine)
    return ingredients

def get_ingredient_by_id(ingredient_id):
    engine = engine_from_config()
    query = f"""
        SELECT * FROM ingredients WHERE id = '{ingredient_id}';
    """
    ingredient = pandas.read_sql(query, engine)
    return ingredient

def get_ingredient_components(ingredient_id):
    engine = engine_from_config()
    query = f"""
        SELECT * FROM ingredient_components WHERE ingredient_id = '{ingredient_id}';
    """
    ingredient_components = pandas.read_sql(query, engine)
    return ingredient_components

def get_ingredient_content(ingredient_id):
    engine = engine_from_config()
    query = f"""
        SELECT * FROM ingredient_content WHERE ingredient_id = '{ingredient_id}';
    """
    ingredient_content = pandas.read_sql(query, engine)
    return ingredient_content

def get_joined_order_blend(engine=None, filters:list = None, limit:list = None):
    base = f"""
        SELECT * from blend_ingredients_relations bir
        INNER JOIN orders on bir.blend_id = orders.blend_id
        INNER JOIN payments on orders.payment_id = payments.id
        AND bir.is_unit != "UNITLESS" 
    """
    engine = engine_from_config() if not engine else engine
    query = build_query(base, filters, limit)
    return pandas.read_sql(query, engine)

def merge_blend_inventory(blend: pandas.DataFrame, inventory: dict):
    """
    Returns a dataframe where the blends information from the Mariadb is augmented with the 
    supplement information from the inventory.yaml
    """
    blend['ingredient'] = blend['ingredient_id'].astype(str).apply(inventory.get)
    blend = pandas.concat([blend.drop(['ingredient'],axis=1),blend['ingredient'].apply(pandas.Series)],axis=1)
    return blend

def orders_available(splits=helpers.load_config()['splitting']) -> bool:
    """
    Will check if there are any unprocessed orders in the database and how  many
    """
    n_splits_with_data = 0
    for split in splits:
        filters = split["filters"]
        orders = get_orders(filters=filters,limit=split["limit"])
        n_splits_with_data += len(orders.index)
    return n_splits_with_data > 0, n_splits_with_data

def update_order_status(order_id: int, engine=None, 
                        new_status=helpers.load_config()['data_handling']['status_completed']):
    """
    Will update the status of an order based on the value provided in the config file

        Parameters:
            order_id (int): Order id of the entry to be updated
    """
    engine = engine_from_config() if not engine else engine
    query = f"UPDATE orders SET status='{new_status}' WHERE id = {order_id};"
    with engine.connect() as con:
        con.execute(query)