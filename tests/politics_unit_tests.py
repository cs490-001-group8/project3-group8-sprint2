"""
    news_unit_tests.py
    This file does all tests for news.py
"""
import sys
import unittest
import unittest.mock as mock
import datetime
from os.path import dirname, join
# pylint: disable=C0413
sys.path.append(join(dirname(__file__), "../"))
import politics


# pylint: disable=W0613
class PoliticsTestCases(unittest.TestCase):
    """Make all the test cases"""

    # pylint: disable=R0201
    def mock_json_load_nocache(self, file):
        """Mock an empty cache"""
        return {}

    def mock_json_load_newcache_bills(self, file):
        """Mock an up to date cache"""
        new_time = datetime.datetime.now().timestamp()
        return {"timestamp": new_time, "bills": []}

    def mock_json_load_newcache_politicians(self, file):
        """Mock an up to date cache"""
        new_time = datetime.datetime.now().timestamp()
        return {"timestamp": new_time, "politicians": []}

    def mock_json_load_oldcache_bills(self, file):
        """Mock an outdated cache"""
        old_time = datetime.datetime.now().timestamp() - (politics.BILL_CACHE_LIFE + 100)
        return {"timestamp": old_time}

    def mock_json_load_oldcache_politicians(self, file):
        """Mock an outdated cache"""
        old_time = datetime.datetime.now().timestamp() - (politics.POLITICIAN_CACHE_LIFE + 100)
        return {"timestamp": old_time}

    # pylint: disable=W0622
    # pylint: disable=R0913
    def mock_search_bills(
            self, state, updated_since, type, chamber, sort, search_window
    ):
        """Mock searching bills"""
        return [
            {
                "title": "BILL1",
                "updated_at": datetime.datetime.now(),
                "sponsors": [{"name": "JOE"}, {"name": "SAM"}],
                "actions": [{"action": "first"}, {"action": "second"}],
            },
            {
                "title": "BILL2",
                "updated_at": datetime.datetime.now(),
                "sponsors": [{"name": "KAT"}, {"name": "NICOLE"}],
                "actions": [{"action": "first"}, {"action": "second"}],
            },
        ]

    def mock_search_politicians(
            self, state, chamber, active
    ):
        """Mock searching bills"""
        return [
            {
                "full_name": "Joe Shmoo",
                "photo_url": "url",
                "url": "https://www.google.com/",
                "district": "6A",
                "party": "Democrat",
                "chamber": "upper",
            },
            {
                "full_name": "Jane Shmane",
                "photo_url": "url",
                "url": "https://www.google.com/",
                "district": "7b",
                "party": "Republican",
                "chamber": "lower",
            },
        ]

    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_get_cached_bills(self):
        """Make get_cached_bills test"""
        with mock.patch("json.load", self.mock_json_load_nocache):
            res = politics.get_cached_bills()
            self.assertIsNone(res)
        with mock.patch("json.load", self.mock_json_load_oldcache_bills):
            res = politics.get_cached_bills()
            self.assertIsNone(res)
        with mock.patch("json.load", self.mock_json_load_newcache_bills):
            res = politics.get_cached_bills()
            self.assertIsInstance(res, dict)

    def test_get_recent_bills_cached(self):
        """Make get_recent_bills test"""
        with mock.patch("json.load", self.mock_json_load_newcache_bills):
            res = politics.get_recent_bills()
            self.assertIsInstance(res, dict)

    def test_get_recent_bills_new(self):
        """Make get_recent_bills test"""
        with mock.patch("json.load", self.mock_json_load_oldcache_bills), mock.patch(
                "pyopenstates.search_bills", self.mock_search_bills
        ), mock.patch("builtins.open", mock.mock_open()):
            res = politics.get_recent_bills()
            self.assertIsInstance(res, dict)

    def test_get_cached_politicians(self):
        """Make get_cached_bills test"""
        with mock.patch("json.load", self.mock_json_load_nocache):
            res = politics.get_cached_politicians()
            self.assertIsNone(res)
        with mock.patch("json.load", self.mock_json_load_oldcache_politicians):
            res = politics.get_cached_politicians()
            self.assertIsNone(res)
        with mock.patch("json.load", self.mock_json_load_newcache_politicians):
            res = politics.get_cached_politicians()
            self.assertIsInstance(res, dict)

    def test_get_politicians_cached(self):
        """Make get_recent_bills test"""
        with mock.patch("json.load", self.mock_json_load_newcache_politicians):
            res = politics.get_politicians()
            self.assertIsInstance(res, dict)

    def test_get_politicians_new(self):
        """Make get_recent_bills test"""
        with mock.patch("json.load", self.mock_json_load_oldcache_politicians), mock.patch(
                "pyopenstates.search_legislators", self.mock_search_politicians
        ), mock.patch("builtins.open", mock.mock_open()):
            res = politics.get_politicians()
            self.assertIsInstance(res, dict)


if __name__ == "__main__":
    unittest.main()
