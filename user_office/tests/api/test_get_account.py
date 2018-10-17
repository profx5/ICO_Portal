from ..base import APITestCase
from user_office.factories import AccountFactory, KYCFactory


class TestGetAccount(APITestCase):
    def test_successful_request(self):
        KYCFactory(investor=self.get_investor())
        account = AccountFactory(investor=self.get_investor(), currency='LTC')

        response = self.client.get('/api/getAccount/',
                                   {'currency': 'LTC'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True, 'address': account.address})

    def test_non_kyc_user(self):
        AccountFactory(investor=self.get_investor(), currency='ETH')

        response = self.client.get('/api/getAccount/',
                                   {'currency': 'ETH'})

        self.assertEqual(response.status_code, 403)
