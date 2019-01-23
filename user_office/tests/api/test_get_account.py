from ..base import APITestCase
from user_office.factories import AccountFactory, KYCFactory


class TestGetAccount(APITestCase):
    def test_successful_request(self):
        KYCFactory(investor=self.get_investor())
        account = AccountFactory(investor=self.get_investor(), currency='PROXY')

        response = self.client.get('/api/getAccount/',
                                   {'currency': 'DAI'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True, 'address': account.address})

    def test_non_kyc_user(self):
        AccountFactory(investor=self.get_investor(), currency='PROXY')

        response = self.client.get('/api/getAccount/',
                                   {'currency': 'DAI'})

        self.assertEqual(response.status_code, 403)
