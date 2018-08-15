from ..base import APITestCase
from user_office.factories import ICO_InfoFactory


class TestGetICOInfo(APITestCase):
    def test_successful_request(self):
        ICO_InfoFactory(total_supply=100000000)

        response = self.client.get('/api/getICOInfo/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'token_decimals': 18,
            'total_supply': '100000000',
            'token_address': '0xDf86D26bD790fBae51A3C3abf07f77D6DC691A19',
            'crowdsale_address': '0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD'
        })
