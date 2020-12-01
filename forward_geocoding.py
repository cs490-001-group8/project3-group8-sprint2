"""
    Forward Geocoding allows us to convert
    one or more address into Geographic
    coordinates (i.e Latitude & Longitude)
    Please set GEOCODIO_API_KEY=API_KEY
    in your .env file to work without error
"""
import os
import requests
from dotenv import load_dotenv

load_dotenv()

KEY_API_KEY = "api_key"
KEY_LIMIT = "limit"
KEY_CITY = "city"
KEY_RESULTS = "results"
KEY_LOCATION = "location"
KEY_LATITUDE = "lat"
KEY_LONGITUDE = "lng"

GEOCODIA_API_BASE_URL = "https://api.geocod.io/v1.6/geocode"
GEOCODIO_API_KEY = os.getenv("GEOCODIO_API_KEY")


def get_latlon(city):
    """

    Given City Name, return
    Geographic Coordinates
    if Exist otherwise return
    an empty dictionary

    """
    payload = {KEY_API_KEY: GEOCODIO_API_KEY, KEY_LIMIT: 1, KEY_CITY: city}
    response = requests.get(GEOCODIA_API_BASE_URL, params=payload)
    response = response.json()
    try:
        lat = response[KEY_RESULTS][0][KEY_LOCATION][KEY_LATITUDE]
        lon = response[KEY_RESULTS][0][KEY_LOCATION][KEY_LONGITUDE]
        return {KEY_LATITUDE: lat, KEY_LONGITUDE: lon}
    except KeyError:
        return {}
