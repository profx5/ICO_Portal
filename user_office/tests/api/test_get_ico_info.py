from datetime import datetime

from user_office.models import Phase
from .base import APITestCase


class GetICOPhaseStats(APITestCase):
    def test_successful_request(self):
        response = self.client.get('/api/getICOInfo/')

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data,
                          {'USDcPerETHRate': 86315,
                           'USDcRaised': 0,
                           'crowdSaleAddress': '0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152',
                           'currentPhase': {'discountPercent': 40,
                                            'endTime': 1523145600,
                                            'hardCapUSDc': 300000000,
                                            'name': 'preICO',
                                            'softCapUSDc': 200000000,
                                            'startTime': 1520467200},
                           'tokenAddress': '0xAF8E6ddBAe9Bb80c63297363bb1de9B5fe2C6914',
                           'totalHardCapUSDc': 400000000})
