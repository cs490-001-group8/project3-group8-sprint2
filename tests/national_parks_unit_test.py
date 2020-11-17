"""
    Testing national_parks module to ensure
    that it holds the logic defined
"""
import sys
import unittest
import unittest.mock as mock
from os.path import dirname, join

sys.path.append(join(dirname(__file__), "../"))
# pylint: disable=C0413
from national_parks import (
    national_parks,
    KEY_FULLNAME,
    KEY_PARK_NAME,
    KEY_DATA,
    KEY_URL,
    KEY_DESCRIPTION,
    KEY_LATITUDE,
    KEY_LONGITUDE,
    KEY_ACTIVITIES,
    KEY_ACTIVITY_NAME,
    KEY_COST,
    KEY_ENTRANCEFEES,
    KEY_DIRECTIONS_INFO,
    KEY_DIRECTIONS_URL,
    KEY_OPERATING_HOURS,
    KEY_STANDHOURS,
    KEY_IMAGES,
    KEY_IMAGE_ALT_TEXT,
    KEY_IMAGE_CAPTION,
    KEY_IMAGE_URL,
)

KEY_EXPECTED = "expected"
KEY_RESULTS = "results"
KEY_ERROR = "error"


class MockedRequestResponseSuccess:
    """
    Mock Succesful NPS API
    Resposne and json method
    Perform on that response
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
            KEY_DATA: [
                {
                    KEY_FULLNAME: "washington park",
                    KEY_URL: "https://washingtonPark.com",
                    KEY_DESCRIPTION: "this is a nice park for childer of all age",
                    KEY_LATITUDE: "-39.0",
                    KEY_LONGITUDE: "-40.0",
                    KEY_ACTIVITIES: [{KEY_ACTIVITY_NAME: "fishing"}],
                    KEY_ENTRANCEFEES: [
                        {KEY_COST: "0.0", KEY_DESCRIPTION: "There is no fees at all"}
                    ],
                    KEY_DIRECTIONS_INFO: "This trail can be access by bike and walking",
                    KEY_DIRECTIONS_URL: "http://www.nps.gov/appa/planyourvisit/directions.htm",
                    KEY_OPERATING_HOURS: [
                        {
                            KEY_DESCRIPTION: "Open entire day",
                            KEY_STANDHOURS: {
                                "sunday": "all day",
                            },
                        }
                    ],
                    KEY_IMAGES: [
                        {
                            KEY_IMAGE_URL: "https://www.nps.gov/common/uploads/\
                                structured_data/3C8397D6-1DD8-B71B-0BEF4C54462A1EB3.jpg",
                            KEY_IMAGE_CAPTION: "Nice image",
                            KEY_IMAGE_ALT_TEXT: "Sunlight reflects on water",
                        }
                    ],
                }
            ]
        }
class MockedRequestResponseFailure:
    """
    Mock Failure NPS API
    Response in case of 
    reaching API call limit
    and nothing return as response
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
                KEY_ERROR: " reach your api call limit ",
        }

class TestingNationlParksModule(unittest.TestCase):
    """
    All test for the module goes here
    """

    @mock.patch("national_parks.requests.get")
    def test_national_parks_success(self, mocked_requests_get):
        """Testing some return values of function national_parks in national_parks"""
        mocked_requests_get.return_value = MockedRequestResponseSuccess()
        response = national_parks()[0]
        expected = {
            KEY_PARK_NAME: "washington park",
            KEY_URL: "https://washingtonPark.com",
            KEY_ACTIVITIES: [
                "fishing"
            ]
        }
        self.assertEqual(response[KEY_PARK_NAME], expected[KEY_PARK_NAME])
        self.assertListEqual(response[KEY_ACTIVITIES], expected[KEY_ACTIVITIES])
        self.assertEqual(response[KEY_URL], expected[KEY_URL])
        
    @mock.patch("national_parks.requests.get")
    def test_national_parks_failure(self, mocked_requests_get):
        """Testing the function when API call returns an errror or nothing"""
        mocked_requests_get.return_value = MockedRequestResponseFailure()
        response = national_parks()
        expected = {
            KEY_PARK_NAME: "washington park",
            KEY_URL: "https://washingtonPark.com",
            KEY_ACTIVITIES: [
                "fishing"
            ]
        }
        self.assertNotEqual(response, expected)
        self.assertEqual(response, [])


if __name__ == "__main__":
    unittest.main()
