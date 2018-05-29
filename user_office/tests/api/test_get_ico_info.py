from ..base import APITestCase
from user_office.factories import ICO_InfoFacotry


class TestGetICOInfo(APITestCase):
    def test_successful_request(self):
        ICO_InfoFacotry(total_supply=100000000)

        response = self.client.get('/api/getICOInfo/')

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.data,
                          {'token_decimals': 2,
                           'total_supply': '100000000',
                           'token_address': '0x2feB9363a9bb1E16Ab90F6d4007264774e959F34'})
