from ..base import APITestCase
from user_office.factories import ICO_InfoFacotry


class TestGetICOInfo(APITestCase):
    def test_successful_request(self):
        ICO_InfoFacotry(total_supply=100000000)

        response = self.client.get('/api/getICOInfo/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'token_decimals': 18,
            'total_supply': '100000000',
            'token_address': '0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
            'crowdsale_address': '0x703941C626999Ede2F1630ea95AFCcB6b96a3857'
        })
