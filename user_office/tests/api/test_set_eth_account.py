from ..base import APITestCase
from user_office.factories import TokensMoveFactory


class TestSetEthAccount(APITestCase):
    eth_account = ''
    tokens_amount = 0

    def test_set_bad_account(self):
        account = '0xHelloWorld2'

        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': account})

        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.data, {'success': False, 'error':
                                         'Account should be hexadecimal'})

        self.assertEqual(self.get_investor().eth_account, '')

    def test_set_zero_account(self):
        account = '0x0000000000000000000000000000000000000000'

        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': account})

        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.data, {'success': False, 'error':
                                         'Invalid account address'})

        self.assertEqual(self.get_investor().eth_account, '')

    def test_successful_request(self):
        account = '0x73015966604928A312F79F7E69291a656Cb88602'

        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': account})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True})

        self.assertEqual(self.get_investor().eth_account, account)

    def test_filled_eth_account(self):
        account = '0x73015966604928A312F79F7E69291a656Cb88602'

        investor = self.get_investor()
        investor.eth_account = account
        investor.save()

        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': account})

        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.data, {'success': False,
                                         'error': 'eth_account already filled'})

    def test_recalc_balance(self):
        account = '0x73015966604928A312F79F7E69291a656Cb88602'
        tokens_move = TokensMoveFactory(investor=None, investor_id=account)

        self.assertEqual(self.get_investor().tokens_amount, 0)

        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': account})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'success': True})
        self.assertEqual(self.get_investor().tokens_amount, tokens_move.amount)

    def test_invalid_checksum(self):
        account = '0x73015966604928A312f79f7E69291a656Cb88602'
        response = self.client.post('/api/setEthAccount/',
                                    {'eth_account': account})

        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.data, {'success': False,
                                         'error': 'Invalid eip-55 checksum'})
