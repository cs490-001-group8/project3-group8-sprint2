"""
    This file searches for NJ Bills
"""
import os
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
import pyopenstates

load_dotenv()

API_KEY = os.getenv("POLITICS_API_KEY")
pyopenstates.set_api_key(API_KEY)

BILL_CACHE_FILE = "bill_cache.json"

CACHE_LIFE = 1800


def get_cached_bills():
    """Get bills that have been cached"""
    with open(BILL_CACHE_FILE, "r", encoding="utf8") as cache:
        old_response = json.load(cache)
        if "timestamp" not in old_response:
            return None
        curr_time = datetime.now().timestamp()
        if curr_time - old_response["timestamp"] < CACHE_LIFE:
            return old_response
    return None


def get_recent_bills():
    """Get recent bills in NJ"""
    last_week = (datetime.today() - timedelta(days=7)).strftime("%Y-%m-%d")

    saved_bills = get_cached_bills()
    if not saved_bills:
        new_bills = pyopenstates.search_bills(
            state="nj",
            updated_since=last_week,
            type="bill",
            chamber="upper",
            sort="updated_at",
            search_window="term",
        )
        bills_found = len(new_bills)
        curr_time = datetime.now().timestamp()
        data = {"timestamp": curr_time, "bills": []}

        for i in range(min(5, bills_found)):
            this_bill = new_bills[i]
            this_bill_sponsors = []
            for sponsor in this_bill["sponsors"]:
                this_bill_sponsors.append(sponsor["name"])
            data["bills"].append(
                {
                    "title": this_bill["title"],
                    "updated_at": this_bill["updated_at"].strftime("%Y-%m-%d"),
                    "sponsors": this_bill_sponsors,
                }
            )

        with open(BILL_CACHE_FILE, "w", encoding="utf8") as cache:
            cache.write(json.dumps(data))

        return data

    return saved_bills
