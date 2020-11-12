"""
    This file searches twitter for tweets
"""
import os
import json
import datetime
import requests
from dotenv import load_dotenv

load_dotenv()

KEY_QUERY = "q"
KEY_TOKEN = "token"
KEY_ARTICLES = "articles"
KEY_TIMESTAMP = "timestamp"

CACHE_FILE = "cache.json"
FREE_NEWS_API_KEY = os.getenv("FREE_NEWS_API_KEY")
FREE_NEWS_API_BASE_URL = "https://gnews.io/api/v4/search"

def get_cache_news():
    """Get the cache data"""
    with open(CACHE_FILE, "r", encoding="utf8") as cache:
        data = json.load(cache)
        timestamp = datetime.datetime.now().timestamp()
        if timestamp - data[KEY_TIMESTAMP] < 3600:
            return data[KEY_ARTICLES]
    return None

def get_latest_news():
    """Get the most recent 5 news using API"""
    result = get_cache_news()
    if result is None:
        payload = {
            KEY_QUERY: "new jersey",
            KEY_TOKEN: FREE_NEWS_API_KEY,
        }
        response = requests.get(FREE_NEWS_API_BASE_URL, params=payload)
        result = response.json()[KEY_ARTICLES][:5]

        with open(CACHE_FILE, "w", encoding="utf8") as cache:
            json_object = json.dumps({
                KEY_TIMESTAMP: datetime.datetime.now().timestamp(),
                KEY_ARTICLES: result
            }, indent=4)
            cache.write(json_object)

    return result
