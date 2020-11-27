"""
    Testing my weather API by mocking
    the functionality to make sure my
    function that uses it still able to
    function same over different inputs
"""
from datetime import datetime
import unittest
import unittest.mock as mock
import sys
from os.path import dirname, join

# pylint: disable=C0413
sys.path.append(join(dirname(__file__), "../"))
from hourly_weather import (
    TZ_NY,
    format_time_to_ny,
    format_hourly_response,
    fetch_weather,
    KEY_DT,
    KEY_TEMP,
    KEY_FEELS_LIKE,
    KEY_WEATHER,
    KEY_DESCRIPTON,
    KEY_ICON,
    KEY_TIME,
    KEY_TIMEZONE,
    KEY_CURRENT,
    KEY_SUNRISE,
    KEY_SUNSET,
    KEY_HOURLY,
)
from forward_geocoding import KEY_LATITUDE, KEY_LONGITUDE_RETURN

KEY_INPUT = "input"
KEY_EXPECTED = "expected"


class MockedRequestResponseSuccess:
    """
    Mock Success weather API
    Response that returns Data
    for given latitude & longitude
    """

    def avoid_pylint_errors(self):
        """
        This method does nothing but to avoid
        pylint error too few public methods
        """

    # pylint: disable=R0201
    def json(self):
        """
        Mock JSON Decoding
        """
        return {
            KEY_TIMEZONE: "America/New York",
            KEY_CURRENT: {
                KEY_DT: 1545730073,
                KEY_SUNRISE: 1545730073,
                KEY_SUNSET: 1545730073,
                KEY_TEMP: 65,
                KEY_FEELS_LIKE: 60,
                KEY_WEATHER: [{KEY_DESCRIPTON: "broken cloud", KEY_ICON: "01d"}],
            },
            KEY_HOURLY: [
                {
                    KEY_DT: 1545730073,
                    KEY_TEMP: 63,
                    KEY_FEELS_LIKE: 55,
                    KEY_WEATHER: [
                        {
                            KEY_DESCRIPTON: "clear sky",
                            KEY_ICON: "01d",
                        }
                    ],
                }
            ],
        }


class HourlyWeatherTests(unittest.TestCase):
    """
    Test function that fetches weather information
    from openweathermap API and others functios that
    format time and list of hourly weather data
    """

    def setUp(self):
        """
        Set up test cases before running
        the test cases and their expected response
        """
        self.test_format_time_to_ny_success = [
            {
                KEY_INPUT: 1545730073,
                KEY_EXPECTED: datetime.fromtimestamp(1545730073).astimezone(TZ_NY),
            }
        ]
        self.test_format_hourly_response_success = [
            {
                KEY_INPUT: [
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730075,
                        KEY_TEMP: 64,
                        KEY_FEELS_LIKE: 60,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear",
                                KEY_ICON: "01n",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730076,
                        KEY_TEMP: 67,
                        KEY_FEELS_LIKE: 54,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "broken cloud",
                                KEY_ICON: "04d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                    {
                        KEY_DT: 1545730073,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_WEATHER: [
                            {
                                KEY_DESCRIPTON: "clear sky",
                                KEY_ICON: "01d",
                            }
                        ],
                    },
                ],
                KEY_EXPECTED: [
                    {
                        KEY_TIME: 4,
                        KEY_TEMP: 63,
                        KEY_FEELS_LIKE: 55,
                        KEY_DESCRIPTON: "clear sky",
                        KEY_ICON: "https://openweathermap.org/img/wn/" +
                                  "01d" +
                                  "@2x.png",
                    }
                ],
            }
        ]
        self.test_fetch_weather_success = [
            {
                KEY_INPUT: "jersey city",
                KEY_EXPECTED: {
                    KEY_CURRENT: {
                        KEY_TIMEZONE: "America/New York",
                        KEY_TIME: 4,
                        KEY_SUNRISE: "04:27",
                        KEY_SUNSET: "04:27",
                        KEY_TEMP: 65,
                        KEY_FEELS_LIKE: 60,
                        KEY_DESCRIPTON: "broken cloud",
                        KEY_ICON: "https://openweathermap.org/img/wn/01d@2x.png",
                    }
                },
            }
        ]
        self.test_edge_case_fetch_weather_failure = [{KEY_INPUT: "", KEY_EXPECTED: {}}]

    def test_format_time_to_ny(self):
        """
        Test the functionality of format_time_to_ny
        and check it returns expected result
        """
        for test_case in self.test_format_time_to_ny_success:
            response = format_time_to_ny(test_case[KEY_INPUT])
            expected = test_case[KEY_EXPECTED]

            self.assertEqual(response, expected)

    def test_format_hourly_response(self):
        """
        Test format_hourly_response function
        and make sure it returns expected results
        """
        for test_case in self.test_format_hourly_response_success:
            response = format_hourly_response(test_case[KEY_INPUT])
            expected = test_case[KEY_EXPECTED]

            self.assertListEqual([response[0]], expected)

    @mock.patch("hourly_weather.get_latlon")
    @mock.patch("hourly_weather.format_hourly_response")
    @mock.patch("hourly_weather.requests.get")
    def test_fetch_weather(
            self, mocked_requests_get, mocked_format_hourly, mocked_get_latlon
    ):
        """
        Test the main function that fetches weather data
        For a given city name and returns polished data
        """
        for test_case in self.test_fetch_weather_success:
            mocked_get_latlon.return_value = {
                KEY_LATITUDE: 40.00,
                KEY_LONGITUDE_RETURN: -34.34,
            }
            mocked_requests_get.return_value = MockedRequestResponseSuccess()
            resposne = fetch_weather(test_case[KEY_INPUT])
            expected = test_case[KEY_EXPECTED]

            assert mocked_format_hourly.called_once
            self.assertEqual(resposne[KEY_CURRENT], expected[KEY_CURRENT])

    @mock.patch("hourly_weather.get_latlon")
    def test_edge_case_fetch_weather(self, mocked_get_latlon):
        """
        Test edge case when the given city name doesn't
        have valid coordinates and return empty dictionary
        """
        for test_case in self.test_edge_case_fetch_weather_failure:
            mocked_get_latlon.return_value = {}
            resposne = fetch_weather(test_case[KEY_INPUT])
            expected = test_case[KEY_EXPECTED]

            self.assertDictEqual(resposne, expected)


if __name__ == "__main__":
    unittest.main()
