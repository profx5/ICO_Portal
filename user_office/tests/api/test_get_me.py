from ..base import APITestCase
from user_office.factories import KYCFactory


class TestGetMe(APITestCase):
    def test_successful_request(self):
        response = self.client.get('/api/getMe/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data,
                         {'email': 'gordon@example.com',
                          'eth_account': '0x73015966604928A312F79F7E69291a656Cb88602',
                          'tokens_amount': '1231',
                          'kyc_required': True})

    def test_passed_kyc_user(self):
        KYCFactory(investor=self.get_investor())

        response = self.client.get('/api/getMe/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data,
                         {'email': 'gordon@example.com',
                          'eth_account': '0x73015966604928A312F79F7E69291a656Cb88602',
                          'tokens_amount': '1231',
                          'kyc_required': False})
