"""
    tweets_unit_tests.py
    This file does all tests for tweets.py
"""
import sys
import unittest
import unittest.mock as mock
from os.path import dirname, join

# pylint: disable=C0415
sys.path.append(join(dirname(__file__), "../"))


class TweetTestCases(unittest.TestCase):
    """Make all the test cases"""

    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_tweets_get_tweets(self):
        """Test get_tweets"""
        mocker = mock.MagicMock()
        with mock.patch("tweepy.API", mocker):
            import tweets

            result = tweets.get_tweet("AAAA")
            if (
                    "text" not in result
                    or "sname" not in result
                    or "ppic" not in result
                    or "uname" not in result
                    or "time" not in result
                    or "date" not in result
            ):
                raise ValueError

    # pylint: disable=R0201
    # pylint: disable=R0916
    def test_tweets_get_politicians(self):
        """Test get_politicians_latest_tweets"""
        mocker = mock.MagicMock()
        with mock.patch("tweepy.API", mocker):
            import tweets

            result = tweets.get_politicians_latest_tweets()
            if (
                    "gov" not in result
                    or "sen" not in result
                    or not isinstance(result["sen"], list)
                    or len(result["sen"]) != 2
            ):
                raise ValueError


if __name__ == "__main__":
    unittest.main()
