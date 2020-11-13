"""
    This file searches for NJ Bills
"""
import os
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta
import pyopenstates

load_dotenv()

API_KEY = os.getenv("POLITICS_API_KEY")

pyopenstates.set_api_key(API_KEY)

def get_recent_bills():
    LAST_WEEK = (datetime.today() - timedelta(days=7)).strftime("%Y-%m-%d")
    
    new_bills = pyopenstates.search_bills(state="nj", updated_since=LAST_WEEK, type="bill", chamber="upper", sort="updated_at", search_window="term")
    print(new_bills[0])
    print(new_bills[1])
    print(new_bills[2])
    print(new_bills[-1])

get_recent_bills()