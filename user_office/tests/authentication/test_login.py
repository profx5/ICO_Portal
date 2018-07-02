from ico_portal.utils.datetime import datetime
from ..base import APITestCase


class TestLoginViaEmail(APITestCase):
    setup_login = False

    def test_successful_login(self):
        response = self.client.post('/login/', {
            'email': self.email,
            'password': self.password
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user_office/')
        self.assertIn('sessionid', self.client.cookies)

    def test_invalid_password(self):
        response = self.client.post('/login/', {
            'email': self.email,
            'password': '1234'
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/login/')
        self.assertNotIn('sessionid', self.client.cookies)

    def test_inactive_user(self):
        investor = self.get_investor()
        investor.is_active = False
        investor.save()

        response = self.client.post('/login/', {
            'email': self.email,
            'password': self.password
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/login/')
        self.assertNotIn('sessionid', self.client.cookies)

    def test_logged_in_user(self):
        self.client.login(email=self.email, password=self.password)
        response = self.client.get('/login/')

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user_office/')


class TestLoginViaMetamask(APITestCase):
    setup_login = False

    def setUp(self):
        self.utcnow = datetime(2018, 7, 2, 16, 14)
        self.stub_datetime_utcnow(self.utcnow)

        super().setUp()

    def test_successful_login(self):
        signature = '0x9ee58a2e849769c07e3bff861aa552c004d36ee60e82238109ec6f12d23b862b45a53f6575c41d7db0dd1fce9b3b2b7d5d1cdc2a3f3af355254fa9368fa279991c'

        response = self.client.post('/login/', {
            'account': self.eth_account,
            'signature': signature
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/user_office/')
        self.assertIn('sessionid', self.client.cookies)

    def test_invalid_signature(self):
        signature = '0x674edd6a61d43aba5d1e4d81a0902822eb9b3ad9b0a9375ad02c28fc9c16aaac2c58a3a3beff5118aaf5c99942561ac719a374f9a40e8e5b6385b1a62adf963a1b'

        response = self.client.post('/login/', {
            'account': self.eth_account,
            'signature': signature
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/login/')
        self.assertNotIn('sessionid', self.client.cookies)
