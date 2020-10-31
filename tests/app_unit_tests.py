"""
    unmocked_unit_tests.py
    This file does all non-mocked unit tests
"""
import unittest
import sys
from os.path import dirname, join


# pylint: disable=R0902
class AppTestCases(unittest.TestCase):
    """Make all the test cases"""

    maxDiff = None

    def setUp(self):
        """Set up test cases"""
        self.success_test_params = [
        ]

    def test_app_runs_success(self):
        """Test successful test cases"""
        sys.path.append(join(dirname(__file__), "../"))
        import app


if __name__ == "__main__":
    unittest.main()
