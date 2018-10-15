import urllib
import responses
from oslash import Right, Left
from decimal import Decimal
from uuid import UUID

from ..base import BlockChainTestCase
from django.test.client import RequestFactory
from blockchain.currencies.cpg.services import GetAccount
from blockchain.currencies.cpg.services.process_ipn import ProcessIPN, SkipIPN
from blockchain.currencies import Currencies
from user_office.factories import InvestorFactory, AccountFactory, ExchangeRateFactory, PaymentFactory
from user_office.models import Payment, TokensMove, Transfer, Account, Transaction


class TestProcessIPN(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['price_oracle', 'token', 'crowdsale']

    request_data = {
        'address': 'mwHHRbLcC394T7vsLQZVh8FsB3QkDNRKK9',
        'tx_id': '25705000a564b7852947faa1fea2987143410bb3ada53458b6eead67e7469d60',
        'code': '100',
        'block_hash': '000000004c3604d758cba41c30c1f2be2ffa3e730a3017ded08078dc422a614e',
        'confirmations': '6',
        'value': '0.39654376'
    }

    signature = 'e9d9b8dd920acb8bc3cb6878f15e178569aff0e66b9545bd6d64f77e3ff27568' \
                '0a6462f93ef8b5bbf1ea06fba9b68f6d8d97de3a3218049ae0236daff52a5e0f'

    def setUp(self):
        super().setUp()

        self.investor = InvestorFactory(eth_account=self.account['address'])
        self.exchange_rate = ExchangeRateFactory(currency='BTC', rate=Decimal('142321.43610'))
        self.account = AccountFactory(investor=self.investor,
                                      currency='BTC',
                                      address='mwHHRbLcC394T7vsLQZVh8FsB3QkDNRKK9')

        self.request_factory = RequestFactory()

        self.settings = Currencies.get_currency('BTC')

    def test_successful_processing(self):
        request = self.request_factory.post('/', self.request_data, HTTP_HMAC=self.signature)

        result = ProcessIPN(self.settings)(request)

        self.assertTrue(isinstance(result, Right))

        transactions = Transaction.objects.all()
        self.assertEqual(transactions.count(), 1)

        transaction = transactions.first()

        self.assertEqual(transaction.data,
                         '0xa3fc81cb00000000000000000000000073015966604928a312f79f7e69291a656cb'
                         '886020000000000000000000000000000000000000000000000000000000000561d94')
        self.assertIsNone(transaction.nonce)
        self.assertEqual(transaction.value, Decimal('0'))
        self.assertIsNone(transaction.from_account)
        self.assertEqual(transaction.to_account, self.crowdsale_contract.address)
        self.assertEqual(transaction.gas, 150000)
        self.assertIsNone(transaction.gas_price)
        self.assertIsNone(transaction.txn_hash)
        self.assertEqual(transaction.state, 'PREPARED')
        self.assertIsNone(transaction.fail_reason)
        self.assertEqual(transaction.created_at, self.utcnow)
        self.assertIsInstance(transaction.txn_id, UUID)

        transfers = Transfer.objects.all()
        self.assertEqual(transfers.count(), 1)

        transfer = transfers.first()
        self.assertEqual(transfer.state, 'PREPARED')
        self.assertEqual(transfer.buy_txn_id, transaction.txn_id)

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 1)

        tokens_move = tokens_moves.first()
        self.assertEqual(tokens_move.investor, self.investor)
        self.assertIsNone(tokens_move.amount)
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'PREPARED')
        self.assertEqual(tokens_move.direction, 'IN')

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        payment = payments.first()
        self.assertEqual(payment.currency, 'BTC')
        self.assertEqual(payment.payer_account, 'mwHHRbLcC394T7vsLQZVh8FsB3QkDNRKK9')
        self.assertEqual(payment.amount, Decimal('0.39654376'))
        self.assertEqual(payment.amounti, Decimal('39654376'))
        self.assertEqual(payment.txn_id, '25705000a564b7852947faa1fea2987143410bb3ada53458b6eead67e7469d60')
        self.assertEqual(payment.received_at, self.utcnow)
        self.assertEqual(payment.tokens_move, tokens_move)
        self.assertEqual(payment.usdc_value, Decimal('5643668'))
        self.assertEqual(payment.rate_usdc, Decimal('14232144'))
        self.assertIsNone(payment.bonus_percent)
        self.assertIsNone(payment.bonus_ids)

    def test_invalid_signature(self):
        request = self.request_factory.post('/', self.request_data, HTTP_HMAC='python')
        result = ProcessIPN(self.settings)(request)

        self.assertTrue(isinstance(result, Left))
        self.assertEqual(result.value, 'Invalid signature')

    def test_invalid_code(self):
        request_data = {**self.request_data, 'code': 10}
        signature = 'f0239e4821d633fba535033f573e428a567c0c300bdfbcec10810bfc04eaeae1' \
                    '35f4b4d5b9e12b6f04b93edb9793730ec1fd36f7c53434cc01ce1cd791e4d20f'

        request = self.request_factory.post('/', request_data, HTTP_HMAC=signature)

        result = ProcessIPN(self.settings)(request)
        self.assertIsInstance(result, SkipIPN)

    def test_processed_payment(self):
        request = self.request_factory.post('/', self.request_data, HTTP_HMAC=self.signature)

        PaymentFactory(external_id=self.request_data['tx_id'])

        result = ProcessIPN(self.settings)(request)
        self.assertTrue(isinstance(result, SkipIPN))
        self.assertEqual(result.value, 'IPN already processed')


class TestGetAccount(BlockChainTestCase):
    investor_eth_address = '0xB0a3f48478d84a497f930d8455711d9981B66a70'

    def setUp(self):
        self.investor = InvestorFactory(eth_account=self.investor_eth_address)

        self.settings = Currencies.get_currency('BTC')

    def test_existing_account(self):
        account = AccountFactory(investor=self.investor,
                                 currency='BTC')

        result = GetAccount()(self.investor, self.settings)

        self.assertTrue(isinstance(result, Right))
        self.assertEqual(result.value.account, account)

    @responses.activate
    def test_non_existing_account(self):
        responses.add(
            method='POST',
            url='http://cpg_host:8080/api/get_account/',
            json={
                'success': True,
                'account': 'ms1kWBYg35mCCsfaSEXaGiYegk9JsYkbEJ'
            }
        )

        result = GetAccount()(self.investor, self.settings)

        self.assertTrue(isinstance(result, Right))

        account = result.value.account

        self.assertTrue(isinstance(account, Account))

        self.assertEqual(Account.objects.count(), 1)
        self.assertEqual(Account.objects.first(), account)

        self.assertEqual(account.investor, self.investor)
        self.assertEqual(account.currency, 'BTC')
        self.assertEqual(account.address, 'ms1kWBYg35mCCsfaSEXaGiYegk9JsYkbEJ')

        self.assertEqual(responses.calls[0].request.url, 'http://cpg_host:8080/api/get_account/')
        self.assertEqual(urllib.parse.unquote(responses.calls[0].request.body),
                         'notify_url=http://localhost:8000/cpg_ipn/btc/')

        headers = responses.calls[0].request.headers
        self.assertEqual(headers['CPG_API_KEY'], 'KBMwMKJ748JH5v0CTHJ71Q')
