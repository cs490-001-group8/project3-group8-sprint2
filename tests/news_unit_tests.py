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
sys.path.append(join(dirname(__file__), "../"))
from news import get_cache_news, get_latest_news

KEY_INPUT = "input"
KEY_METHOD = "method"
KEY_EXPECTED = "expected"

class MockedAPIResponse:

    def __init__(self, text):
        self.status_code = 200
        self.text = text

    def json(self):
        return json.loads(self.text)

class NewsTestCases(unittest.TestCase):
    """Make all the test cases"""

    # pylint: disable=R0201
    # pylint: disable=R0916
    def setUp(self):
        self.test_fetch_cache_success = {
            KEY_INPUT: {
                "timestamp": datetime.datetime.now().timestamp(),
                "articles": [
                    {
                        "title": "Former \u2018Jersey Shore\u2019 Star Sammi Giancola Shows Off Long Legs In Short White Dress",
                        "description": "Former Jersey Shore star Sammi \u201cSweetheart\u201d Giancola showed off her long legs in a short white dress in a new Instagram share. The former reality show star, who was seen in the original ...",
                        "content": "Former Jersey Shore star Sammi \u201cSweetheart\u201d Giancola showed off her long legs in a short white dress in a new Instagram share. The former reality show star, who was seen in the original six seasons of the series, stunned her followers in the snap. He... [2288 chars]",
                        "url": "https://www.inquisitr.com/6379236/jersey-shore-sammi-giancola-long-legs/",
                        "image": "https://cdn.inquisitr.com/wp-content/uploads/2020/11/sammi-giancola.jpg",
                        "publishedAt": "2020-11-11T17:13:59Z",
                        "source": {
                            "name": "The Inquisitr",
                            "url": "https://www.inquisitr.com/"
                        }
                    }
                ]
            },
            KEY_EXPECTED: [
                {
                    "title": "Former \u2018Jersey Shore\u2019 Star Sammi Giancola Shows Off Long Legs In Short White Dress",
                    "description": "Former Jersey Shore star Sammi \u201cSweetheart\u201d Giancola showed off her long legs in a short white dress in a new Instagram share. The former reality show star, who was seen in the original ...",
                    "content": "Former Jersey Shore star Sammi \u201cSweetheart\u201d Giancola showed off her long legs in a short white dress in a new Instagram share. The former reality show star, who was seen in the original six seasons of the series, stunned her followers in the snap. He... [2288 chars]",
                    "url": "https://www.inquisitr.com/6379236/jersey-shore-sammi-giancola-long-legs/",
                    "image": "https://cdn.inquisitr.com/wp-content/uploads/2020/11/sammi-giancola.jpg",
                    "publishedAt": "2020-11-11T17:13:59Z",
                    "source": {
                        "name": "The Inquisitr",
                        "url": "https://www.inquisitr.com/"
                    }
                }
            ]
        }

        self.test_fetch_recent_success = {
            KEY_INPUT: 
                """{"articles": [
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                    {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}}
                ]}""",
            KEY_EXPECTED: [
                {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}},
                {"title": "A","description": "B","content": "C","url": "D","image": "E","publishedAt": "F","source": {"name": "G","url": "H"}}
            ]
        }

    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_news_get_cache(self):
        p1 = mock.patch( "builtins.open", mock.MagicMock() )
        m = mock.MagicMock( side_effect = [ self.test_fetch_cache_success[KEY_INPUT] ] )
        p2 = mock.patch( "json.load", m )

        with p1, p2:
            result = get_cache_news()

        self.assertEqual(result, self.test_fetch_cache_success[KEY_EXPECTED])
        
    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_news_get_recent(self):
        p1 = mock.patch( "requests.get", self.mocked_requests )
        m2 = mock.MagicMock( side_effect = [ None ] )
        p2 = mock.patch( "news.get_cache_news", m2 )
        p3 = mock.patch( "builtins.write", mock.MagicMock() )

        with p1, p2, p3:
            result = get_latest_news()

        self.assertEqual(result, self.test_fetch_recent_success[KEY_EXPECTED])
        
    def mocked_requests(self, url, params):
        return MockedAPIResponse(self.test_fetch_recent_success[KEY_INPUT])

if __name__ == "__main__":
    unittest.main()
