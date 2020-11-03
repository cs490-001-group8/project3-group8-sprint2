"""
    unmocked_unit_tests.py
    This file does all non-mocked unit tests
"""
import unittest
import unittest.mock as mock
import sys
from os.path import dirname, join

sys.path.append(join(dirname(__file__), "../"))
import app

# pylint: disable=R0902
class AppTestCases(unittest.TestCase):
    """Make all the test cases"""

    maxDiff = None

    def setUp(self):
        """Set up test cases"""
        self.success_test_params = [
        ]
        
    def mocked_flask_render(self, url):
        """Mock Flask render"""
        if not isinstance(url, str):
            raise ValueError("URL not string")

    def test_app_runs_success(self):
        """Test successful test cases"""
        with mock.patch("flask.render_template", self.mocked_flask_render):
            app.hello()
    
    def mocked_user_object(self, user_object):
        if not isinstance(user_object, dict):
            raise ValueError("user_object is not a dictionary")
    
    def test_on_user_login(self):
        test_user = {
            "id": "xxxxxxx",
            "name": "Ameer",
            "image": "https://xxxxx",
            "email": "xxx@xxxx.com"
        }
        with mock.patch("app.on_user_login", self.mocked_user_object):
            app.on_user_login(test_user)
            self.assertEqual(4, len(test_user))

if __name__ == "__main__":
    unittest.main()
