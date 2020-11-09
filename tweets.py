"""
    tweetpy
    This file searches twitter for tweets
"""
import os
from dotenv import load_dotenv
import tweepy

load_dotenv()

#Set up authentication for the tweepy API using environmental variables set up like in the README
AUTH = tweepy.OAuthHandler(os.getenv("TWITTER_CONSUMER_KEY"), os.getenv("TWITTER_CONSUMER_SECRET"))
AUTH.set_access_token(os.getenv("TWITTER_ACCESS_TOKEN"), os.getenv("TWITTER_ACCESS_TOKEN_SECRET"))

#Get the tweepy object you can use to access the Twitter API
API = tweepy.API(AUTH, wait_on_rate_limit=True)
