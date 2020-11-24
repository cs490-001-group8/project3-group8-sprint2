"""

    Testing my module that takes accepts
    city name and returns its geographic
    coordinates such as latitude & longitude

"""
import sys
import unittest
import unittest.mock as mock
from os.path import dirname, join
sys.path.append(join(dirname(__file__), "../"))
# pylint: disable=C0413
from forward_geocoding import (
    get_latlon,
    KEY_LATITUDE,
    KEY_LONGITUDE,
    KEY_RESULTS,
    KEY_LOCATION,
    KEY_LONGITUDE_RETURN,
)


KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_ERROR = "error"


class MockedRequestResponseSuccess:
    """
        Mock Succesful Geocodio API
        Resposne and json method
        Perform on that response
    """
    def __init__(self, latitude, longitude):
        """
            Expect latitude and longitude
        """
        self.latitude = latitude
        self.longitude = longitude
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
            KEY_RESULTS: [
                {
                    KEY_LOCATION: {
                        KEY_LATITUDE: self.latitude,
                        KEY_LONGITUDE: self.longitude,
                    }
                }
            ]
        }


class MockedRequestResponseFailure:
    """
        Mock Geocodio failure API response
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
        return {KEY_ERROR: "can't get geographic coordinates"}


class ForwardGeocodingTests(unittest.TestCase):
    """
        Test the functionality of a function that
        fetches geographic coordinates for a given
        valid city name and their latitude & longitude
    """
    def setUp(self):
        """
            Set up test cases before running
            the test cases and their expected response
        """
        self.test_get_latlon_success = [
            {
                KEY_INPUT: "jersey city",
                KEY_EXPECTED: {
                    KEY_LATITUDE: 40.728157,
                    KEY_LONGITUDE_RETURN: -74.077644,
                },
            }
        ]
        self.test_edge_case_get_latlon = [{KEY_INPUT: "", KEY_EXPECTED: {}}]

    @mock.patch("forward_geocoding.requests.get")
    def test_get_latlon_(self, mocked_requests_get):
        """
            Test when API is returns an successful response
        """
        for test_case in self.test_get_latlon_success:
            mocked_requests_get.return_value = MockedRequestResponseSuccess(
                40.728157, -74.077644
            )
            response = get_latlon(test_case[KEY_INPUT])
            expected = test_case[KEY_EXPECTED]

            self.assertDictEqual(response, expected)

    @mock.patch("forward_geocoding.requests.get")
    def test_get_latlon_failure(self, mocked_requests_get):
        """
            Test when Geocodio API returns an error
        """
        for test_case in self.test_edge_case_get_latlon:
            mocked_requests_get.return_value = MockedRequestResponseFailure()
            response = get_latlon(test_case[KEY_INPUT])
            expected = test_case[KEY_EXPECTED]

            self.assertDictEqual(response, expected)


if __name__ == "__main__":
    unittest.main()
