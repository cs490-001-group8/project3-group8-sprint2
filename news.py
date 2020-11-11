"""
    This file searches twitter for tweets
"""
import os
import requests
from dotenv import load_dotenv

load_dotenv()

KEY_QUERY = "q"
KEY_TOKEN = "token"
KEY_ARTICLES = "articles"
KEY_TIME = "time"

FREE_NEWS_API_KEY = os.getenv("FREE_NEWS_API_KEY")
FREE_NEWS_API_BASE_URL = "https://gnews.io/api/v4/search"

def get_latest_news():
    """Get the most recent 5 news using API"""
    payload = {
        KEY_QUERY: "new jersey",
        KEY_TOKEN: FREE_NEWS_API_KEY,
    }
    response = requests.get(FREE_NEWS_API_BASE_URL, params=payload)
    response = response.json()[KEY_ARTICLES][:5]

    return response
