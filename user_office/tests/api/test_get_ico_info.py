from user_office.models import ICO_Info
from .base import APITestCase


class TestGetICOInfo(APITestCase):
    def test_successful_request(self):
        ico_info = ICO_Info(usd_c_per_eth=55099, total_supply=100000000)
        ico_info.save()

        response = self.client.get('/api/getICOInfo/')

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data,
                          {'usd_c_per_eth': 55099,
                           'total_supply': '100000000',
                           'token_address': '0x029B4Ec0e1A01BCEfFb64591b23315b1D81bd82A'})
