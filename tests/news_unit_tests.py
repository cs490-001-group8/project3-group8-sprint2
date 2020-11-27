"""
    news_unit_tests.py
    This file does all tests for news.py
"""
import sys
import unittest
import unittest.mock as mock
import datetime
import json
from os.path import dirname, join

# pylint: disable=C0415
# pylint: disable=C0413
sys.path.append(join(dirname(__file__), "../"))
from news import get_cache_news, get_latest_news

KEY_INPUT = "input"
KEY_METHOD = "method"
KEY_EXPECTED = "expected"


# pylint: disable=R0903
class MockedAPIResponse:
    """Make API Response object"""

    def __init__(self, text):
        """Mock response object"""
        self.status_code = 200
        self.text = text

    def json(self):
        """Mock json loads call"""
        return json.loads(self.text)


class NewsTestCases(unittest.TestCase):
    """Make all the test cases"""

    # pylint: disable=R0201
    # pylint: disable=R0916
    def setUp(self):
        """Make all the test cases"""
        self.test_fetch_cache_success = {
            KEY_INPUT: {
                "timestamp": datetime.datetime.now().timestamp(),
                "articles": [
                    {
                        "title": "Former \u2018Jersey Shore\u2019 Star Sammi Giancola Shows Off " +
                        "Long Legs In Short White Dress",
                        "description": "Former Jersey Shore star Sammi \u201cSweetheart\u201d " +
                        "Giancola showed off her long legs in a short white dress in a new " +
                        "Instagram share. The former reality show star, who was seen in " +
                        "the original ...",
                        "content": "Former Jersey Shore star Sammi \u201cSweetheart\u201d " +
                        "Giancola showed off her long legs in a short white dress in a " +
                        "new Instagram share. The former reality show star, who was seen " +
                        "in the original six seasons of the series, stunned her followers " +
                        "in the snap. He... [2288 chars]",
                        "url": "https://www.inquisitr.com/6379236/" +
                        "jersey-shore-sammi-giancola-long-legs/",
                        "image": "https://cdn.inquisitr.com/wp-content/uploads/2020/11/" +
                        "sammi-giancola.jpg",
                        "publishedAt": "2020-11-11T17:13:59Z",
                        "source": {
                            "name": "The Inquisitr",
                            "url": "https://www.inquisitr.com/",
                        },
                    }
                ],
            },
            KEY_EXPECTED: [
                {
                    "title": "Former \u2018Jersey Shore\u2019 Star Sammi Giancola Shows Off "
                    + "Long Legs In Short White Dress",
                    "description": "Former Jersey Shore star Sammi \u201cSweetheart\u201d "
                    + "Giancola showed off her long legs in a short white dress in a new "
                    + "Instagram share. The former reality show star, who was seen in "
                    + "the original ...",
                    "content": "Former Jersey Shore star Sammi \u201cSweetheart\u201d "
                    + "Giancola showed off her long legs in a short white dress in a "
                    + "new Instagram share. The former reality show star, who was "
                    + "seen in the original six seasons of the series, stunned her "
                    + "followers in the snap. He... [2288 chars]",
                    "url": "https://www.inquisitr.com/6379236/jersey-shore-sammi-giancola-"
                    + "long-legs/",
                    "image": "https://cdn.inquisitr.com/wp-content/uploads/2020/11/"
                    + "sammi-giancola.jpg",
                    "publishedAt": "2020-11-11T17:13:59Z",
                    "source": {
                        "name": "The Inquisitr",
                        "url": "https://www.inquisitr.com/",
                    },
                }
            ],
        }

        self.test_fetch_recent_success = {
            KEY_INPUT: """{"articles": [
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}}
                ]}""",
            KEY_EXPECTED: [
                {
                    "title": "A",
                    "description": "B",
                    "content": "C",
                    "url": "D",
                    "image": "E",
                    "publishedAt": "F",
                    "source": {"name": "G", "url": "H"},
                },
                {
                    "title": "A",
                    "description": "B",
                    "content": "C",
                    "url": "D",
                    "image": "E",
                    "publishedAt": "F",
                    "source": {"name": "G", "url": "H"},
                },
                {
                    "title": "A",
                    "description": "B",
                    "content": "C",
                    "url": "D",
                    "image": "E",
                    "publishedAt": "F",
                    "source": {"name": "G", "url": "H"},
                },
                {
                    "title": "A",
                    "description": "B",
                    "content": "C",
                    "url": "D",
                    "image": "E",
                    "publishedAt": "F",
                    "source": {"name": "G", "url": "H"},
                },
                {
                    "title": "A",
                    "description": "B",
                    "content": "C",
                    "url": "D",
                    "image": "E",
                    "publishedAt": "F",
                    "source": {"name": "G", "url": "H"},
                },
            ],
        }

    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_news_get_cache(self):
        """Make test get_cache_news"""
        mocker = mock.MagicMock(side_effect=[self.test_fetch_cache_success[KEY_INPUT]])

        with mock.patch("builtins.open", mock.MagicMock()), mock.patch(
            "json.load", mocker
        ):
            result = get_cache_news()

        self.assertEqual(result, self.test_fetch_cache_success[KEY_EXPECTED])

    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_news_get_recent(self):
        """Make test_news_get_recent"""
        mocker = mock.MagicMock(side_effect=[None])

        with mock.patch("requests.get", self.mocked_requests), mock.patch(
            "news.get_cache_news", mocker
        ), mock.patch("builtins.open", mock.MagicMock()):
            result = get_latest_news()

        self.assertEqual(result, self.test_fetch_recent_success[KEY_EXPECTED])

    # pylint: disable=W0613
    def mocked_requests(self, url, params):
        """Mock requests"""
        return MockedAPIResponse(self.test_fetch_recent_success[KEY_INPUT])


if __name__ == "__main__":
    unittest.main()
