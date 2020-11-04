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
KEY_LIMIT   = 'limit'
KEY_CITY    = 'city'
KEY_RESULTS = 'results'
KEY_LOCATION = 'location'
KEY_LATITUDE = 'lat'
KEY_LONGITUDE = 'lng'
KEY_LONGITUDE_RETURN = 'lon'

GEOCODIA_API_BASE_URL="https://api.geocod.io/v1.6/geocode"
GEOCODIO_API_KEY = os.getenv("GEOCODIO_API_KEY")
MOCKED_RESPONSE = "{'input': {'address_components': {'city': 'Jersey City', 'country': 'US'}, 'formatted_address': 'Jersey City'},"\
    " 'results': [{'address_components': {'city': 'Jersey City', 'county': 'Hudson County', 'state': 'NJ', 'zip': '07097', 'country': 'US'},"\
    " 'formatted_address': 'Jersey City, NJ 07097', 'location': {'lat': 40.73276, 'lng': -74.075485}, 'accuracy': 1, 'accuracy_type': 'place',"\
    " 'source': 'TIGER/Line® dataset from the US Census Bureau'}]}"

def get_LatLon(city):
    """
        
        Given City Name, return
        Geographic Coordinates 
        if Exist otherwise return
        an empty dictionary
    
    """
    payload = {
        KEY_API_KEY: GEOCODIO_API_KEY,
        KEY_LIMIT: 1,
        KEY_CITY: city
    }
    response = requests.get(GEOCODIA_API_BASE_URL,params=payload)
    response = response.json()
    try:
        lat = response[KEY_RESULTS][0][KEY_LOCATION][KEY_LATITUDE]
        lon = response[KEY_RESULTS][0][KEY_LOCATION][KEY_LONGITUDE]
        return {KEY_LATITUDE: lat, KEY_LONGITUDE_RETURN: lon}
    except Exception as e:
        return {}
