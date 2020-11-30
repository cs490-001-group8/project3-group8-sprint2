"""
    Fetch hourly weather based on given city
    Throw error when city or data don't exist.
    Please in your .env file, set API key for
    weather as OPEN_WEATHER_API_KEY=YOUR_KEY
"""
import os
from datetime import datetime
import requests
import pytz
from dotenv import load_dotenv
from forward_geocoding import get_latlon

load_dotenv()

# Convert datetime to local time zone
TZ_NY = pytz.timezone("America/New_York")

KEY_LATITUDE = "lat"
KEY_LONGITUDE = "lon"
KEY_EXCLUDE = "exclude"
KEY_UNITS = "units"
KEY_COUNT = "cnt"
KEY_API_KEY = "appid"
KEY_TIME = "time"
KEY_HOURLY = "hourly"
KEY_TEMP = "temp"
KEY_FEELS_LIKE = "feels_like"
KEY_DESCRIPTON = "description"
KEY_WEATHER = "weather"
KEY_DT = "dt"
KEY_ICON = "icon"
KEY_CURRENT = "current"
KEY_SUNRISE = "sunrise"
KEY_SUNSET = "sunset"
KEY_TIMEZONE = "timezone"

NUMBER_OF_HOURS = 12
OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"
OPEN_WEATHER_API_KEY = os.getenv("OPEN_WEATHER_API_KEY")


def format_time_to_ny(unix_time):
    """
    Convert UTC DateTime to New York
    Timezone for better readability
    """
    assert isinstance(unix_time, int)
    return datetime.fromtimestamp(unix_time).astimezone(TZ_NY)


def format_hourly_response(hourly_list):
    """
    Take list of hourly weather data
    format with correct time zone and
    only return 12 hours data formated
    """
    assert len(hourly_list) > 0
    response = []
    current_hour = 1
    for each in hourly_list:
        if current_hour == NUMBER_OF_HOURS:
            break
        response.append(
            {
                KEY_TIME: int(format_time_to_ny(each[KEY_DT]).strftime("%H")),
                KEY_TEMP: each[KEY_TEMP],
                KEY_FEELS_LIKE: each[KEY_FEELS_LIKE],
                KEY_DESCRIPTON: each[KEY_WEATHER][0][KEY_DESCRIPTON],
                KEY_ICON: "https://openweathermap.org/img/wn/"
                          + each[KEY_WEATHER][0][KEY_ICON]
                          + "@2x.png",
            }
        )
        current_hour += 1
    return response

def fetch_weather(city):
    """
    Make request to weather API
    using the passed city param
    """

    try:
        geo_coordinates = get_latlon(city)
        payload = {
            KEY_LATITUDE: geo_coordinates[KEY_LATITUDE],
            KEY_LONGITUDE: geo_coordinates["lng"],
            KEY_EXCLUDE: "minutely,alerts",
            KEY_UNITS: "imperial",
            KEY_COUNT: 3,
            KEY_API_KEY: OPEN_WEATHER_API_KEY,
        }
        resposne = requests.get(OPEN_WEATHER_API_BASE_URL, params=payload)
        response = resposne.json()
        response = {
            KEY_CURRENT: {
                KEY_TIMEZONE: response[KEY_TIMEZONE],
                KEY_TIME: int(
                    format_time_to_ny(response[KEY_CURRENT][KEY_DT]).strftime("%H")
                ),
                KEY_SUNRISE: format_time_to_ny(
                    response[KEY_CURRENT][KEY_SUNRISE]
                ).strftime("%H:%M"),
                KEY_SUNSET: format_time_to_ny(
                    response[KEY_CURRENT][KEY_SUNSET]
                ).strftime("%H:%M"),
                KEY_TEMP: response[KEY_CURRENT][KEY_TEMP],
                KEY_FEELS_LIKE: response[KEY_CURRENT][KEY_FEELS_LIKE],
                KEY_DESCRIPTON: response[KEY_CURRENT][KEY_WEATHER][0][KEY_DESCRIPTON],
                KEY_ICON: "https://openweathermap.org/img/wn/"
                          + response[KEY_CURRENT][KEY_WEATHER][0][KEY_ICON]
                          + "@2x.png",
            },
            KEY_HOURLY: format_hourly_response(response[KEY_HOURLY]),
        }
        return response
    except KeyError:
        return {}
