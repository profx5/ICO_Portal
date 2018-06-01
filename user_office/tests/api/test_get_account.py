from ..base import APITestCase
from user_office.factories import AccountFactory


class TestKYC(APITestCase):
    def test_successful_request(self):
        account = AccountFactory(investor=self.get_investor(), currency='ETH')

        response = self.client.get('/api/getAccount/',
                                   {'currency': 'ETH'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True, 'address': account.address})
