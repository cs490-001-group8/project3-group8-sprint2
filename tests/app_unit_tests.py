"""
    unmocked_unit_tests.py
    This file does all non-mocked unit tests
"""
import unittest
import unittest.mock as mock
import sys
from os.path import dirname, join

# pylint: disable=C0413
sys.path.append(join(dirname(__file__), "../"))
import app

# pylint: disable=R0903
# pylint: disable=W0613

class MockedQueryResponseObj:
    """Pretend to be a query response object"""

    def __init__(self, text, name):
        self.text = text
        self.name = name


class MockedFilterResponse:
    """Pretend to be an query response"""

    def __init__(self, texts):
        self.texts = texts

    def all(self):
        """Mock an all() call from a query response"""
        return self.texts


class MockedQueryResponse:
    """Pretend to be an query response"""

    def __init__(self, text):
        self.texts = [MockedQueryResponseObj(text["text"], text["name"])]

    def filter(self, text):
        """Pretend to be an query filter"""
        return MockedFilterResponse(self.texts)

    def all(self):
        """Mock an all() call from a query response"""
        return self.texts


# pylint: disable=R0902
# pylint: disable=R0201
class AppTestCases(unittest.TestCase):
    """Make all the test cases"""

    maxDiff = None

    def setUp(self):
        """Set up test cases"""
        self.success_test_params = []

    def mocked_flask_render(self, url):
        """Mock Flask render"""
        if not isinstance(url, str):
            raise ValueError("URL not string")

    def mock_session_commit(self):
        """Mock Session commit"""
        return

    def mock_session_query(self, model):
        """Mock Session commit"""
        return MockedQueryResponse({"text": "TEST", "name": "USER"})

    def mock_session_add_comment(self, comment):
        """Mock Session add for comments"""
        if not isinstance(comment.tab, str):
            raise ValueError("Tab not string")
        if not isinstance(comment.text, str):
            raise ValueError("Text not string")

    def mock_flask_emit_all(self, channel, data=""):
        """Mock Session add for comments"""
        if channel == "new comment":
            if "text" not in data or not isinstance(data["text"], str):
                raise ValueError("NO TEXT")
            if "tab" not in data or not isinstance(data["tab"], str):
                raise ValueError("NO TAB")
        else:
            raise ValueError("NO ESTABLISHED CHANNEL")

    def mock_flask_emit_one(self, channel, data=""):
        """Mock Session add for comments"""
        if channel == "old comments":
            if "comments" not in data:
                raise ValueError("NO COMMENTS")
            for comment in data["comments"]:
                if "text" not in comment:
                    raise ValueError("NO TEXT IN COMMENT")
        else:
            raise ValueError("NO ESTABLISHED CHANNEL")

    def test_app_runs_success(self):
        """Test successful test cases"""
        with mock.patch("flask.render_template", self.mocked_flask_render):
            app.hello()

    def test_app_new_comment_success(self):
        """Test successful new comments"""
        with mock.patch(
                "sqlalchemy.orm.session.Session.commit", self.mock_session_commit
        ), mock.patch(
            "sqlalchemy.orm.session.Session.add", self.mock_session_add_comment
        ), mock.patch(
            "flask_socketio.SocketIO.emit", self.mock_flask_emit_all
        ):
            app.on_new_comment({"text": "Hello, I'm Joe", "name": "Joe", "tab": "Home"})

    def test_app_new_comment_failure(self):
        """Test failed new comments"""
        with mock.patch(
                "sqlalchemy.orm.session.Session.commit", self.mock_session_commit
        ):
            app.on_new_comment({"text": "Hello, I'm Joe"})
            app.on_new_comment({"text": 9, "tab": "Home"})
            app.on_new_comment({"text": "Hello", "tab": 7})
            app.on_new_comment({"text": "Hello, I'm Joe", "name": 9, "tab": "Home"})

    def test_app_get_comments_success(self):
        """Test successful new comments"""
        with mock.patch(
                "sqlalchemy.orm.session.Session.commit", self.mock_session_commit
        ), mock.patch(
            "sqlalchemy.orm.session.Session.add", self.mock_session_add_comment
        ), mock.patch(
            "sqlalchemy.orm.session.Session.query", self.mock_session_query
        ), mock.patch(
            "flask_socketio.emit", self.mock_flask_emit_one
        ):
            app.on_get_comments({"tab": "Home"})
            app.on_get_comments({"t": "Home"})

    def test_app_get_comments_failure(self):
        """Test successful new comments"""
        with mock.patch(
                "sqlalchemy.orm.session.Session.commit", self.mock_session_commit
        ):
            app.on_get_comments({})


if __name__ == "__main__":
    unittest.main()
