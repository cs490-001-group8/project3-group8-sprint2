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

    def mock_session_commit(self):
        return
    
    def mock_session_add_comment(self, comment):
        if not isinstance(comment.tab, str):
            raise ValueError("Tab not string")
        if not isinstance(comment.text, str):
            raise ValueError("Text not string")
        return

    def test_app_runs_success(self):
        """Test successful test cases"""
        with mock.patch("flask.render_template", self.mocked_flask_render):
            app.hello()

    def test_app_new_comment_success(self):
        with mock.patch("sqlalchemy.orm.session.Session.commit", self.mock_session_commit
        ), mock.patch("sqlalchemy.orm.session.Session.add", self.mock_session_add_comment):
            app.on_new_comment({"text": "Hello, I'm Joe", "tab": "Home"})

    def test_app_new_comment_failure(self):
        with mock.patch("sqlalchemy.orm.session.Session.commit", self.mock_session_commit
        ), mock.patch("sqlalchemy.orm.session.Session.add", self.mock_session_add_comment):
            app.on_new_comment({"text": "Hello, I'm Joe"})

if __name__ == "__main__":
    unittest.main()
