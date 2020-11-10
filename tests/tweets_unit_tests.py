import sys
import unittest
import unittest.mock as mock
import datetime
from os.path import dirname, join
sys.path.append(join(dirname(__file__), "../"))

class TweetTestCases(unittest.TestCase):
    def test_tweets_get_tweets(self):
        mocker = mock.MagicMock()
        with mock.patch("tweepy.API", mocker):
            import tweets
            result = tweets.get_tweet("AAAA")
            if "text" not in result or "sname" not in result or "ppic" not in result or "uname" not in result or "time" not in result or "date" not in result:
                raise ValueError

if __name__ == "__main__":
    unittest.main()
