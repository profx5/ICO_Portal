from ..base import APITestCase


class TestChangePassword(APITestCase):
    new_password = 'q123q321q123'

    def test_successful_password_change(self):
        response = self.client.post('/api/changePassword/', {
            'old_password': self.password,
            'new_password1': self.new_password,
            'new_password2': self.new_password
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True})
        self.assertTrue(self.get_investor().check_password(self.new_password))

    def test_invalid_old_password(self):
        response = self.client.post('/api/changePassword/', {
            'old_password': self.password + 'hui',
            'new_password1': self.new_password,
            'new_password2': self.new_password
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {
            'success': False,
            'error': 'password_incorrect'
        })

    def test_mismatch_new_password(self):
        response = self.client.post('/api/changePassword/', {
            'old_password': self.password,
            'new_password1': self.new_password,
            'new_password2': self.new_password + 'hui'
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {
            'success': False,
            'error': 'password_mismatch'
        })

    def test_invalid_new_password(self):
        new_password = '1'

        response = self.client.post('/api/changePassword/', {
            'old_password': self.password,
            'new_password1': new_password,
            'new_password2': new_password
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {
            'success': False,
            'error': 'invalid_password'
        })

    def test_same_passowrd(self):
        response = self.client.post('/api/changePassword/', {
            'old_password': self.password,
            'new_password1': self.password,
            'new_password2': self.password
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {
            'success': False,
            'error': 'same_password'
        })
