from oslash import Right, Left
from decimal import Decimal
from unittest.mock import patch

from ico_portal.utils.datetime import datetime
from ..base import BlockChainTestCase
from django.test.client import RequestFactory
from blockchain.currencies.coinpayments.services.process_ipn import ProcessIPN, \
    SkipIPN
from blockchain.currencies.coinpayments.services.get_account import GetAccount
from blockchain.currencies import Currencies
from user_office.factories import *
from user_office.models import Payment, TokensMove, Transfer, Account


class TestProcessIPN(BlockChainTestCase):
    investor_eth_address = '0xB0a3f48478d84a497f930d8455711d9981B66a70'

    request_data = {
        'ipn_version': '1.0',
        'ipn_id': 'f790dc4cc3f0e5f565efe50593de8cc5',
        'ipn_mode': 'hmac',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_type': 'deposit',
        'address': 'mqZutf2dbv2oW9KzTM9NpiimhpqWAYLuoG',
        'txn_id': '007b6fb10f7906ea2ae8e99c62434dfaf0b70c89c1e0e7b8c628dca329cfad03',
        'status': '100',
        'status_text': 'Deposit confirmed',
        'currency': 'LTC',
        'amount': '0.10000000',
        'amounti': '10000000',
        'fee': '0.00050000',
        'feei': '50000',
        'confirms': '0'
    }

    signature = '4e1f63eb7c5bfb68433408893944f14a2b1ca9ff1d3a3e0d38aaa70077ae7c26ba781942e485d4a8b741dbe57289401e0c3b44d786cc4a79cc7fca6b72065a5c'

    def setUp(self):
        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

        self.investor = InvestorFactory(eth_account=self.investor_eth_address)
        self.phase = CurrentPhaseFactory(bonus_percents=40)
        self.exchange_rate = ExchangeRateFactory(currency='LTC', rate=Decimal('142.43610'))
        self.account = AccountFactory(investor=self.investor,
                                      currency='LTC',
                                      address='mqZutf2dbv2oW9KzTM9NpiimhpqWAYLuoG')

        self.request_factory = RequestFactory()

        self.settings = Currencies.get_currency('LTC')

    def test_successful_processing(self):
        request = self.request_factory.post('/',
                                            self.request_data,
                                            HTTP_HMAC=self.signature)

        result = ProcessIPN(self.settings)(request)

        self.assertTrue(isinstance(result, Right))

        transfers = Transfer.objects.all()
        self.assertEqual(transfers.count(), 1)

        transfer = transfers.first()
        self.assertRegex(transfer.txn_hash, '^0x([A-Fa-f0-9]{64})$')
        self.assertEqual(transfer.state, 'PREPARED')

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 1)

        tokens_move = tokens_moves.first()
        self.assertEqual(tokens_move.investor, self.investor)
        self.assertEqual(tokens_move.amount, Decimal('1994'))
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'PREPARED')
        self.assertEqual(tokens_move.direction, 'IN')

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        payment = payments.first()
        self.assertEqual(payment.currency, 'LTC')
        self.assertEqual(payment.payer_account, 'mqZutf2dbv2oW9KzTM9NpiimhpqWAYLuoG')
        self.assertEqual(payment.amount, Decimal('0.1'))
        self.assertEqual(payment.amounti, Decimal('10000000'))
        self.assertEqual(payment.txn_id, '007b6fb10f7906ea2ae8e99c62434dfaf0b70c89c1e0e7b8c628dca329cfad03')
        self.assertEqual(payment.received_at, self.utcnow)
        self.assertEqual(payment.tokens_move, tokens_move)

    def test_invalid_signature(self):
        request = self.request_factory.post('/',
                                            self.request_data,
                                            HTTP_HMAC='python')

        result = ProcessIPN(self.settings)(request)

        self.assertTrue(isinstance(result, Left))
        self.assertEqual(result.value, 'Invalid signature')

    def test_invalid_merchant(self):
        request = self.request_factory.post('/',
                                            dict(self.request_data, merchant='0'),
                                            HTTP_HMAC=self.signature)

        result = ProcessIPN(self.settings)(request)

        self.assertTrue(isinstance(result, Left))
        self.assertEqual(result.value, 'Invalid request merchant')

    def test_invalid_status(self):
        request = self.request_factory.post('/',
                                            dict(self.request_data, status=3),
                                            HTTP_HMAC=self.signature)

        result = ProcessIPN(self.settings)(request)

        self.assertTrue(isinstance(result, SkipIPN))
        self.assertEqual(result.value, 'Invalid status')

    def test_invalid_type(self):
        request = self.request_factory.post('/',
                                            dict(self.request_data, ipn_type='button'),
                                            HTTP_HMAC=self.signature)

        result = ProcessIPN(self.settings)(request)

        self.assertTrue(isinstance(result, SkipIPN))
        self.assertEqual(result.value, 'Invalid ipn_type')

    def test_processed_payment(self):
        request = self.request_factory.post('/',
                                            self.request_data,
                                            HTTP_HMAC=self.signature)

        payment = PaymentFactory(external_id=self.request_data['ipn_id'])

        result = ProcessIPN(self.settings)(request)
        self.assertTrue(isinstance(result, SkipIPN))
        self.assertEqual(result.value, 'IPN already processed')


class TestGetAccount(BlockChainTestCase):
    investor_eth_address = '0xB0a3f48478d84a497f930d8455711d9981B66a70'

    def setUp(self):
        self.investor = InvestorFactory(eth_account=self.investor_eth_address)

        self.settings = Currencies.get_currency('LTC')

    def test_existing_account(self):
        account = AccountFactory(investor=self.investor,
                                 currency='LTC')

        result = GetAccount()(self.investor, self.settings)

        self.assertTrue(isinstance(result, Right))
        self.assertEqual(result.value, account)

    @patch('blockchain.currencies.coinpayments.services.get_account.GetAccount.get_coinpayments_account')
    def test_non_existing_account(self, get_account):
        response = {
            "error":"ok",
            "result":{
                "address":"LitecoinAddress",
                "pubkey":"",
                "dest_tag":100,
            }
        }

        get_account.side_effect = lambda args: Right(dict(args, response=response))

        result = GetAccount()(self.investor, self.settings)
        self.assertTrue(isinstance(result, Right))

        account = result.value

        self.assertTrue(isinstance(account, Account))

        self.assertEqual(Account.objects.count(), 1)
        self.assertEqual(Account.objects.first(), account)

        self.assertEqual(account.investor, self.investor)
        self.assertEqual(account.currency, 'LTC')
        self.assertEqual(account.address, 'LitecoinAddress')
