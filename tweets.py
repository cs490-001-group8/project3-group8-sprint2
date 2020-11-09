"""
    tweetpy
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

def get_politicians_latest_tweets():
    results = {}
    gov_tweet = API.user_timeline(screen_name=GOV_TWITTER, count=1, tweet_mode="extended")[0]
    results["gov"] = {}
    results["gov"]["text"] = html.unescape(gov_tweet.full_text.replace("\n", "   "))
    results["gov"]["sname"] = gov_tweet.user.screen_name
    results["gov"]["ppic"] = gov_tweet.user.profile_image_url
    results["gov"]["uname"] = gov_tweet.user.name
    tweetDT = gov_tweet.created_at
    results["gov"]['time'] = html.unescape(tweetDT.astimezone(EST).strftime("%-I:%M %p"))
    results["gov"]['date'] = html.unescape(tweetDT.astimezone(EST).strftime("%-m/%-d/%y"))
    
    results["sen"] = [{}, {}]
    
    gov_tweet = API.user_timeline(screen_name=SENATOR_TWITTERS[0], count=1, tweet_mode="extended")[0]
    results["sen"][0]["text"] = html.unescape(gov_tweet.full_text)
    results["sen"][0]["sname"] = gov_tweet.user.screen_name
    results["sen"][0]["ppic"] = gov_tweet.user.profile_image_url
    results["sen"][0]["uname"] = gov_tweet.user.name
    tweetDT = gov_tweet.created_at
    results["sen"][0]['time'] = html.unescape(tweetDT.astimezone(EST).strftime("%-I:%M %p"))
    results["sen"][0]['date'] = html.unescape(tweetDT.astimezone(EST).strftime("%-m/%-d/%y"))
    
    gov_tweet = API.user_timeline(screen_name=SENATOR_TWITTERS[1], count=1, tweet_mode="extended")[0]
    results["sen"][1]["text"] = html.unescape(gov_tweet.full_text)
    results["sen"][1]["sname"] = gov_tweet.user.screen_name
    results["sen"][1]["ppic"] = gov_tweet.user.profile_image_url
    results["sen"][1]["uname"] = gov_tweet.user.name
    tweetDT = gov_tweet.created_at
    results["sen"][1]['time'] = html.unescape(tweetDT.astimezone(EST).strftime("%-I:%M %p"))
    results["sen"][1]['date'] = html.unescape(tweetDT.astimezone(EST).strftime("%-m/%-d/%y"))
    
    return results

print(get_politicians_latest_tweets())