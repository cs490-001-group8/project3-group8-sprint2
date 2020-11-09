import os
from dotenv import load_dotenv
import tweepy

load_dotenv()

#Set up authentication for the tweepy API using environmental variables set up like in the README
auth = tweepy.OAuthHandler(os.getenv("TWITTER_CONSUMER_KEY"), os.getenv("TWITTER_CONSUMER_SECRET"))
auth.set_access_token(os.getenv("TWITTER_ACCESS_TOKEN"), os.getenv("TWITTER_ACCESS_TOKEN_SECRET"))

#Get the tweepy object you can use to access the Twitter API
api = tweepy.API(auth, wait_on_rate_limit=True)