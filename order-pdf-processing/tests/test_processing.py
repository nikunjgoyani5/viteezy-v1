import pytest
import shutil
import time
from pathlib import Path

from vop import dirs, processing, helpers, data_feed, sftp

class TestProcessing:

    def test_process_once_no_update(self):
        """Test running processing once, without updating the database or transfering files"""
        helpers.clear_folder(dirs.out_dir)  # Make sure directory is empty
        splits = helpers.load_config()["splitting"] # Get split from config
        _, n_orders = data_feed.orders_available()  # Get expected number of orders
        orders = processing.process_once(update_db=False, transfer_files=False)    # Process orders (without updating database)
        assert len(orders) == n_orders   # Check that length of processed list of orders equals expected processed number
        time.sleep(1)
        out_dirs = [f for f in dirs.out_dir.iterdir() if f.is_dir()]  # get output dirs
        for dir in out_dirs: # For each output dir
            assert (dir / "info.yaml").exists() # Check it contains info.yaml
            assert len(list(dir.rglob("*.csv"))) == 1 # Check there is one .csv file
        pdf_files = list(dirs.out_dir.rglob("*.pdf"))   # Get all PDF files
        doc_files = list(dirs.out_dir.rglob("*.docx"))  # Get all docx files
        assert len(pdf_files) == n_orders   # Confirm expected number of pdf files
        assert len(doc_files) == n_orders   # Confirm expected number of docx files
        helpers.clear_folder(dirs.out_dir)  # Clean the output directory
        _, n_orders_new = data_feed.orders_available()
        assert n_orders_new == n_orders    # Confirm still same number of orders to process

    def test_process_and_transfer(self):
        helpers.clear_folder(dirs.out_dir)  # Make sure directory is empty
        splits = helpers.load_config()["splitting"] # Get split from config
        _, n_orders = data_feed.orders_available()  # Get expected number of orders
        orders = processing.process_once(update_db=False, transfer_files=True)    # Process orders (without updating database)
        assert len(orders) == n_orders   # Check that length of processed list of orders equals expected processed number
        client = connection = sftp.ConParamiko("sftp_server", "foo",private_key=Path("/data/ssh_key"),port=22)
        



    def test_process_once(self):
        """Test running processing once with updaring the database"""
        helpers.clear_folder(dirs.out_dir)  # Make sure directory is empty
        splits = helpers.load_config()["splitting"] # Get split from config
        _, n_orders = data_feed.orders_available()  # Get expected number of orders
        orders = processing.process_once(update_db=True)    # Process orders (without updating database)
        assert len(orders) == n_orders   # Check that length of processed list of orders equals expected processed number
        out_dirs = [f for f in dirs.out_dir.iterdir() if f.is_dir()]  # get output dirs
        for dir in out_dirs: # For each output dir
            assert (dir / "info.yaml").exists() # Check it contains info.yaml
            assert len(list(dir.rglob("*.csv"))) == 1 # Check there is one .csv file
        pdf_files = list(dirs.out_dir.rglob("*.pdf"))   # Get all PDF files
        doc_files = list(dirs.out_dir.rglob("*.docx"))  # Get all docx files
        assert len(pdf_files) == n_orders   # Confirm expected number of pdf files
        assert len(doc_files) == n_orders   # Confirm expected number of docx files
        helpers.clear_folder(dirs.out_dir)  # Clean the output directory
        _, n_orders_new = data_feed.orders_available()
        assert n_orders_new == 0    # Confirm there are now 0 orders to convert
        [data_feed.update_order_status(id,new_status="CREATED") for id in orders]    # Revert the order status in the database
        _, n_orders_new = data_feed.orders_available()
        assert n_orders_new == n_orders    # Confirm original number of orders to be processed after reverting database
