"""
    This file searches twitter for tweets 
"""
import os
import html
from dotenv import load_dotenv
import tweepy
from pytz import timezone
load_dotenv()

#Set up authentication for the tweepy API using environmental variables set up like in the README
AUTH = tweepy.OAuthHandler(os.getenv("TWITTER_CONSUMER_KEY"), os.getenv("TWITTER_CONSUMER_SECRET"))
AUTH.set_access_token(os.getenv("TWITTER_ACCESS_TOKEN"), os.getenv("TWITTER_ACCESS_TOKEN_SECRET"))

#Get the tweepy object you can use to access the Twitter API
API = tweepy.API(AUTH, wait_on_rate_limit=True)

SENATOR_TWITTERS = ["@SenBooker", "@SenatorMenendez"]

GOV_TWITTER = "@GovMurphy"

EST = timezone("EST")

def get_tweet(username):
    tweet = API.user_timeline(screen_name=username, count=1, tweet_mode="extended")[0]
    result = {}
    result["text"] = html.unescape(tweet.full_text.replace("\n", "   "))
    result["sname"] = tweet.user.screen_name
    result["ppic"] = tweet.user.profile_image_url
    result["uname"] = tweet.user.name
    tweetDT = tweet.created_at
    result['time'] = html.unescape(tweetDT.astimezone(EST).strftime("%-I:%M %p"))
    result['date'] = html.unescape(tweetDT.astimezone(EST).strftime("%-m/%-d/%y"))
    return result

def get_politicians_latest_tweets():
    results = {}
    results["gov"] = get_tweet(GOV_TWITTER)
    
    results["sen"] = [{}, {}]
    
    for i in range(2):
        results["sen"][i] = get_tweet(SENATOR_TWITTERS[i])
    
    return results

# print(get_politicians_latest_tweets())