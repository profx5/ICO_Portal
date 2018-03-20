from .base import APITestCase
from .helpers.fixture import fixture_path


class GetMeTestCase(APITestCase):
    def test_successful_request(self):
        response = self.client.get('/api/getMe/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data,
                         {'username': 'gordon',
                          'eth_account': '0x73015966604928A312F79F7E69291a656Cb88602',
                          'tokens_amount': '1231.22000000',
                          'kyc_required': True,
                          'investment_threshold': 10000})

    def test_passed_kyc_user(self):
        with open(fixture_path('photo.jpg'), 'rb') as f:
            response = self.client.post('/api/kyc/', {
                'firstname': 'John',
                'surname': 'Doe',
                'birthdate': '1990-01-01',
                'document_no': 123123,
                'country': 'Russia',
                'photo': f
            }, format='multipart')

        self.assertEqual(response.status_code, 201)

        kyc = self.get_investor().kyc

        kyc.approve(call_contract=False)
        kyc.save()

        response = self.client.get('/api/getMe/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data,
                         {'username': 'gordon',
                          'eth_account': '0x73015966604928A312F79F7E69291a656Cb88602',
                          'tokens_amount': '1231.22000000',
                          'kyc_required': False,
                          'investment_threshold': 5000000})
