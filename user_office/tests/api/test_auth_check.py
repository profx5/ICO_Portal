from ..base import APITestCase


class TestAuthCheck(APITestCase):
    setup_login = False

    def test_not_logged_in_user(self):
        response = self.client.get('/api/getMe/')

        self.assertNotIn('_auth_user_id', self.client.session)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data,
                         {'detail': 'Authentication credentials were not provided.'})

    def test_logged_in_user(self):
        self.client.login(email=self.email, password=self.password)
        response = self.client.get('/api/getMe/')

        self.assertIn('_auth_user_id', self.client.session)
        self.assertEqual(response.status_code, 200)
