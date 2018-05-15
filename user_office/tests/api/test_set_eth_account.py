from .base import APITestCase


class TestSetEthAccount(APITestCase):
    eth_account = ''
    new_eth_account = '0x73015966604928A312F79F7E69291a656Cb88602'
    bad_eth_account = '0xHelloWorld2'

    def test_set_bad_address(self):
        with self.assertRaises(ValueError):
            self.client.post('/api/setEthAccount/',
                             {'eth_account': self.bad_eth_account})

        self.assertEqual(self.get_investor().eth_account, '')

    def test_successful_request(self):
        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': self.new_eth_account})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True})

        self.assertEqual(self.get_investor().eth_account, self.new_eth_account)

    def test_filled_eth_account(self):
        investor = self.get_investor()
        investor.eth_account = self.new_eth_account
        investor.save()

        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': self.new_eth_account})

        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.data, {'success': False,
                                         'error': 'eth account already filled'})
