"""
    news_unit_tests.py
    This file does all tests for news.py
"""
import sys
import unittest
import unittest.mock as mock
import datetime
from os.path import dirname, join
sys.path.append(join(dirname(__file__), "../"))
import bills

class BillsTestCases(unittest.TestCase):
    """Make all the test cases"""
    def mock_json_load_nocache(self, file):
        return {}

    def mock_json_load_newcache(self, file):
        old_time = datetime.datetime.now().timestamp()
        return {"timestamp": old_time}

    def mock_json_load_oldcache(self, file):
        old_time = datetime.datetime.now().timestamp()-(bills.CACHE_LIFE+100)
        return {"timestamp": old_time}

    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_get_cached_bills_no(self):
        """Make get_cached_bills test"""
        with mock.patch("json.load", self.mock_json_load_nocache):
            res = bills.get_cached_bills()
            self.assertIsNone(res)
        with mock.patch("json.load", self.mock_json_load_oldcache):
            res = bills.get_cached_bills()
            self.assertIsNone(res)
        with mock.patch("json.load", self.mock_json_load_newcache):
            res = bills.get_cached_bills()
            self.assertIsInstance(res, dict)
        


if __name__ == "__main__":
    unittest.main()
