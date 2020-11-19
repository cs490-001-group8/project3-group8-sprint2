"""
    This file searches for NJ Political information
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
POLITICIAN_CACHE_FILE = "politician_cache.json"

BILL_CACHE_LIFE = 1800

POLITICIAN_CACHE_LIFE = 86400

def get_cached_bills():
    """Get bills that have been cached"""
    with open(BILL_CACHE_FILE, "r", encoding="utf8") as cache:
        old_response = json.load(cache)
        if "timestamp" not in old_response:
            return None
        curr_time = datetime.now().timestamp()
        if curr_time - old_response["timestamp"] < BILL_CACHE_LIFE:
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
                    "last_action": this_bill["actions"][-1]["action"],
                    "sponsors": this_bill_sponsors,
                }
            )

        with open(BILL_CACHE_FILE, "w", encoding="utf8") as cache:
            cache.write(json.dumps(data))

        return data

    return saved_bills


def get_cached_politicians():
    """Get bills that have been cached"""
    with open(POLITICIAN_CACHE_FILE, "r", encoding="utf8") as cache:
        old_response = json.load(cache)
        if "timestamp" not in old_response:
            return None
        curr_time = datetime.now().timestamp()
        if curr_time - old_response["timestamp"] < POLITICIAN_CACHE_LIFE:
            return old_response
    return None


def get_politicians():
    """Get recent bills in NJ"""
    saved_politicians = get_cached_politicians()
    if not saved_politicians:
        politicians = pyopenstates.search_legislators(
            state="nj",
            chamber="upper",
            active=True,
        )
        curr_time = datetime.now().timestamp()
        data = {"timestamp": curr_time, "politicians": []}

        for pol in politicians:
            imagefix = pol["photo_url"]
            if imagefix != "":
                imagefix = "https" + imagefix[4:]

            data["politicians"].append(
                {
                    "name": pol["full_name"],
                    "photo": imagefix,
                    "website": pol["url"],
                    "district": pol["district"],
                    "party": pol["party"],
                    "chamber": pol["chamber"],
                }
            )

        with open(POLITICIAN_CACHE_FILE, "w", encoding="utf8") as cache:
            cache.write(json.dumps(data))

        return data

    return saved_politicians
