import pytest
from vop import data_feed, helpers

class TestOrdersAvailable:
    """All tests assume that the sample_data.sql is loaded"""

    def test_default(self):
        """Tests with default argument"""
        orders_available, n_orders = data_feed.orders_available()
        assert orders_available == True
        assert n_orders == 7
    
    def test_with_argument(self):
        """Tests with passed argument"""
        splits = helpers.load_config()['splitting']
        orders_available, n_orders = data_feed.orders_available(splits)
        assert orders_available == True
        assert n_orders == 7

    def test_with_argument_no_available(self):
        """Tests with split setting that should return none"""
        splits = helpers.load_config()['splitting'][0]
        splits["filters"].append("orders.status = 'FAKE'")
        orders_available, n_orders = data_feed.orders_available([splits])
        assert orders_available == False
        assert n_orders == 0
