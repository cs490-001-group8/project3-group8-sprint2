"""
    app_unit_tests.py
    This file does all tests for app.py
"""
import unittest
import unittest.mock as mock
from datetime import datetime
import sys
from os.path import dirname, join

# pylint: disable=C0413
sys.path.append(join(dirname(__file__), "../"))

# pylint: disable=R0903
# pylint: disable=W0613
# pylint: disable=C0415
# pylint: disable=W0612
# pylint: disable=E0401
# pylint: disable=C0330


def weather_do_nothing(one, two, three):
    """Do nothing instead of getting weather"""
    return


class MockedQueryResponseObj:
    """Pretend to be a query response object"""

    def __init__(self, text, name, time):
        self.text = text
        self.name = name
        self.time = time


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
        self.texts = [MockedQueryResponseObj(text["text"], text["name"], text["time"])]

    def filter(self, text):
        """Pretend to be an query filter"""
        return MockedFilterResponse(self.texts)

    def all(self):
        """Mock an all() call from a query response"""
        return self.texts


class MockedRequestObject:
    """Pretend to be an query response"""

    def __init__(self):
        self.sid = "AAAAA"


class MockedSQLBase:
    """Pretend to be a sql model"""

    # pylint: disable=C0103
    # pylint: disable=R0201
    def __init__(self):
        self.id = 0

    def create_all(self):
        """Mock the create_all method"""
        return

    def Column(self, obj, primary_key=True):
        """Mock the Column method"""
        return None

    def String(self, obj):
        """Mock the String method"""
        return None


# pylint: disable=R0902
# pylint: disable=R0916
# pylint: disable=R0201
# pylint: disable=R0912
# pylint: disable=R0904
class AppTestCases(unittest.TestCase):
    """Make all the test cases"""

    # pylint: disable=W0622
    # pylint: disable=R0913

    maxDiff = None

    def setUp(self):
        """Set up test cases"""
        self.success_test_params = []

    def mocked_flask_render(self, url):
        """Mock Flask render"""
        if not isinstance(url, str):
            raise ValueError("URL not string")

    def mock_do_nothing(self, first="", checkfirst="", bind=""):
        """Mock Session commit"""
        return

    def mock_get_latest_tweet(self):
        """Mock getting the latest tweets from politicians"""
        return {
            "gov": [
                {
                    "text": "A",
                    "sname": "A",
                    "ppic": "A",
                    "uname": "A",
                    "time": "A",
                    "date": "A",
                }
            ],
            "sen": [
                {
                    "text": "A",
                    "sname": "A",
                    "ppic": "A",
                    "uname": "A",
                    "time": "A",
                    "date": "A",
                },
                {
                    "text": "A",
                    "sname": "A",
                    "ppic": "A",
                    "uname": "A",
                    "time": "A",
                    "date": "A",
                },
            ],
        }

    def mock_get_latest_news(self):
        """Mock getting the latest news"""
        return [
            {
                "title": "A",
                "description": "A",
                "content": "A",
                "url": "A",
                "image": "A",
                "publishedAt": "A",
                "source": {"name": "A", "url": "A"},
            },
            {
                "title": "A",
                "description": "A",
                "content": "A",
                "url": "A",
                "image": "A",
                "publishedAt": "A",
                "source": {"name": "A", "url": "A"},
            },
        ]

    # pylint: disable=R0801
    def mock_search_bills(
        self, sort, type, chamber, state, search_window, updated_since
    ):
        """Mock searching bills through openstates"""
        return [
            # pylint: disable=R0801
            {
                "title": "Bill1",
                "updated_at": datetime.now(),
                "sponsors": [{"name": "Joe"}, {"name": "Sam"}],
                "actions": [{"action": "first"}, {"action": "second"}],
            },
            {
                "title": "Bill2",
                "updated_at": datetime.now(),
                "sponsors": [{"name": "Kat"}, {"name": "Nicole"}],
                "actions": [{"action": "first"}, {"action": "second"}],
            },
        ]

    def mock_search_politicians(
            self, state, chamber, active
    ):
        # pylint: disable=R0801
        """Mock searching bills"""
        return [
            # pylint: disable=R0801
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

    def mock_json_load_oldcache_bills(self, file):
        """Mock an outdated cache"""
        old_time = datetime.now().timestamp() - (5000 + 100)
        return {"timestamp": old_time}

    def mock_json_load_oldcache_politicians(self, file):
        """Mock an outdated cache"""
        old_time = datetime.now().timestamp() - (90000 + 100)
        return {"timestamp": old_time}

    def mock_session_query(self, model):
        """Mock Session commit"""
        return MockedQueryResponse(
            {"text": "TEST", "name": "USER", "time": datetime.now()}
        )

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
        elif channel == "news":
            for news in data:
                if (
                    "title" not in news
                    or "description" not in news
                    or "content" not in news
                    or "url" not in news
                    or "image" not in news
                    or "publishedAt" not in news
                    or "source" not in news
                    or "name" not in news["source"]
                    or "url" not in news["source"]
                ):
                    raise ValueError
        elif channel == "political tweets":
            if "gov" not in data:
                raise ValueError("NO GOVENOR")
            for tweet in data["gov"]:
                if (
                    "text" not in tweet
                    or "sname" not in tweet
                    or "ppic" not in tweet
                    or "uname" not in tweet
                    or "time" not in tweet
                    or "date" not in tweet
                ):
                    raise ValueError
            if "sen" not in data:
                raise ValueError("NO SENATORS")
            for tweet in data["sen"]:
                if (
                    "text" not in tweet
                    or "sname" not in tweet
                    or "ppic" not in tweet
                    or "uname" not in tweet
                    or "time" not in tweet
                    or "date" not in tweet
                ):
                    raise ValueError
        elif channel == "send bills":
            for bill in data["bills"]:
                if (
                    "title" not in bill
                    or "updated_at" not in bill
                    or "sponsors" not in bill
                    or "last_action" not in bill
                ):
                    raise ValueError("VALUE MISSING IN BILL")
                for sponsor in bill["sponsors"]:
                    if not isinstance(sponsor, str):
                        raise ValueError("NAME BAD")
        elif channel == "send politicians":
            for pol in data["politicians"]:
                if (
                        "name" not in pol
                        or "photo" not in pol
                        or "website" not in pol
                        or "district" not in pol
                        or "party" not in pol
                        or "chamber" not in pol
                ):
                    raise ValueError("VALUE MISSING IN POLITICIAN")
        elif channel == "send sport":
            pass
        else:
            raise ValueError("NO ESTABLISHED CHANNEL")

    # pylint: disable=W0102
    def mock_flask_emit_weather(self, channel, data={}):
        """Mock Session for no emit (weather testing)"""
        if channel == "send weather":
            if len(data) == 0:
                raise ValueError("DATA IS EMPTY")
        elif channel == "weather error":
            pass
        else:
            raise ValueError("NO ESTABLISHED CHANNEL")

    def mock_sqlalchemy_create_engine(self, url):
        """Mock create_engine"""
        return "THIS IS AN ENGINE"

    def mock_html_unescape(self, escapable):
        """Mock html.unescape"""
        return "ESCAPED"

    def test_app_runs_success(self):
        """Test successful test cases"""
        with mock.patch(
            "sqlalchemy.create_engine", self.mock_sqlalchemy_create_engine
        ), mock.patch(
            "sqlalchemy.sql.schema.MetaData.create_all", self.mock_do_nothing
        ):
            import app

            with mock.patch("flask.render_template", self.mocked_flask_render):
                app.home()
            with mock.patch("flask.render_template", self.mocked_flask_render):
                app.commuter_tab()
            with mock.patch("flask.render_template", self.mocked_flask_render):
                app.politics_tab()
            with mock.patch("flask.render_template", self.mocked_flask_render):
                app.recreation_tab()

    def test_app_new_comment(self):
        """Test successful new comments"""
        with mock.patch(
            "sqlalchemy.create_engine", self.mock_sqlalchemy_create_engine
        ), mock.patch(
            "sqlalchemy.sql.schema.MetaData.create_all", self.mock_do_nothing
        ), mock.patch(
            "sqlalchemy.orm.session.Session.commit", self.mock_do_nothing
        ), mock.patch(
            "sqlalchemy.orm.session.Session.add", self.mock_session_add_comment
        ), mock.patch(
            "flask_socketio.SocketIO.emit", self.mock_flask_emit_all
        ):
            mocker = mock.MagicMock()
            mocker.values("AAAA")
            with mock.patch("app.flask.request", mocker), mock.patch(
                "sqlalchemy.ext.declarative.declarative_base", mocker
            ):
                import app

                app.on_user_login()
                app.on_new_comment(
                    {"text": "Hello, I'm Joe", "name": "Joe", "tab": "Home"}
                )
                app.on_new_comment({"text": "Hello, I'm Joe"})
                app.on_new_comment({"text": 9, "tab": "Home"})
                app.on_new_comment({"text": "Hello", "tab": 7})
                app.on_new_comment({"text": "Hello, I'm Joe", "name": 9, "tab": "Home"})
                app.on_user_disconnect()
                app.on_new_comment(
                    {"text": "Hello, I'm Joe", "name": "Joe", "tab": "Home"}
                )

    def test_app_get_comments_success(self):
        """Test successful new comments"""
        with mock.patch(
            "sqlalchemy.create_engine", self.mock_sqlalchemy_create_engine
        ), mock.patch(
            "sqlalchemy.sql.schema.MetaData.create_all", self.mock_do_nothing
        ), mock.patch(
            "sqlalchemy.orm.session.Session.commit", self.mock_do_nothing
        ), mock.patch(
            "sqlalchemy.orm.session.Session.add", self.mock_session_add_comment
        ), mock.patch(
            "flask_socketio.SocketIO.emit", self.mock_flask_emit_all
        ), mock.patch(
            "sqlalchemy.orm.session.Session.query", self.mock_session_query
        ), mock.patch(
            "flask_socketio.emit", self.mock_flask_emit_one
        ):
            mocker = mock.MagicMock()
            mocker.values("AAAA")
            with mock.patch("app.flask.request", mocker), mock.patch(
                "sqlalchemy.ext.declarative.declarative_base", mocker
            ):
                import app

                app.on_get_comments({"tab": "Home"})

    def test_app_get_comments_failure(self):
        """Test successful new comments"""
        with mock.patch(
            "sqlalchemy.create_engine", self.mock_sqlalchemy_create_engine
        ), mock.patch(
            "sqlalchemy.sql.schema.MetaData.create_all", self.mock_do_nothing
        ), mock.patch(
            "sqlalchemy.orm.session.Session.commit", self.mock_do_nothing
        ), mock.patch(
            "sqlalchemy.orm.session.Session.add", self.mock_session_add_comment
        ), mock.patch(
            "flask_socketio.SocketIO.emit", self.mock_flask_emit_all
        ), mock.patch(
            "sqlalchemy.orm.session.Session.query", self.mock_session_query
        ), mock.patch(
            "flask_socketio.emit", self.mock_flask_emit_one
        ):
            mocker = mock.MagicMock()
            mocker.values("AAAA")
            session_mocker = mock.MagicMock()
            with mock.patch("app.flask.request", mocker), mock.patch(
                "sqlalchemy.orm.sessionmaker", session_mocker
            ):
                import app

                app.on_get_comments({})
                app.on_get_comments({"t": "Home"})

    def test_city_name_weather_sending(self):
        """test the on_weather_request function"""
        test_weather = {"city_name": "Newark"}
        import app

        with mock.patch("flask_socketio.emit", self.mock_flask_emit_weather):
            app.on_weather_request(test_weather)
            self.assertIsInstance(test_weather, dict)

    def test_zip_code_weather_sending(self):
        """test a zip code as the input"""
        test_weather = {"city_name": "07871"}
        import app

        with mock.patch("flask_socketio.emit", self.mock_flask_emit_weather):
            app.on_weather_request(test_weather)
            self.assertIsInstance(test_weather, dict)

    def test_invalid_code_weather_sending(self):
        """test an invalid, non NJ city"""
        test_weather = {"city_name": "Los Angeles"}
        import app

        with mock.patch("flask_socketio.emit", self.mock_flask_emit_weather):
            app.on_weather_request(test_weather)
            self.assertIsInstance(test_weather, dict)

    def test_render_landing_page(self):
        """Test landing_page rendering"""
        import app

        with mock.patch("flask.render_template", self.mocked_flask_render):
            app.landing_page()

    def test_on_pol_tweet_request(self):
        """test the on_pol_tweet_request function"""
        with mock.patch(
            "tweets.get_politicians_latest_tweets", self.mock_get_latest_tweet
        ):
            import app

            with mock.patch("flask_socketio.emit", self.mock_flask_emit_one):
                app.on_pol_tweet_request()

    def test_on_news_request(self):
        """test the on_news_request"""
        with mock.patch("news.get_latest_news", self.mock_get_latest_news):
            import app

            with mock.patch("flask_socketio.emit", self.mock_flask_emit_one):
                app.on_news_request()

    def test_get_sport_data(self):
        import app
        with mock.patch("flask_socketio.emit", self.mock_flask_emit_one):
            app.get_sport_data()

    def test_on_bill_request(self):
        """Test the on_bills_request method"""
        with mock.patch("json.load", self.mock_json_load_oldcache_bills), mock.patch(
            "pyopenstates.search_bills", self.mock_search_bills
        ), mock.patch("builtins.open", mock.mock_open()):
            import app

            with mock.patch("flask_socketio.emit", self.mock_flask_emit_one):
                app.on_bills_request()

    def test_on_politicians_request(self):
        """Test the on_politicians_request method"""
        with mock.patch("json.load", self.mock_json_load_oldcache_politicians), mock.patch(
                "pyopenstates.search_legislators", self.mock_search_politicians
        ), mock.patch("builtins.open", mock.mock_open()):
            import app

            with mock.patch("flask_socketio.emit", self.mock_flask_emit_one):
                app.on_politicians_request()
    def test_on_national_park(self):
        """Test the on_nationl_parks method that emits back all the parks to requested client"""
        import app

        with mock.patch(
            "app.flask_socketio.emit"
        ) as mocked_flask_socketio_emit, mock.patch(
            "app.national_parks"
        ) as mocked_national_parks:
            mocked_national_parks.return_value = ["array of parks"]
            response = app.on_national_parks()
            expected = ["array of parks"]
            assert mocked_flask_socketio_emit.called_once
            assert mocked_flask_socketio_emit.called_with(["array of parks"])


if __name__ == "__main__":
    unittest.main()
