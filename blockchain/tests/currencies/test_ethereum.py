from oslash import Right
from decimal import Decimal

from ..base import BlockChainTestCase
from user_office.models import Payment
from user_office.factories import InvestorFactory, TokensMoveFactory
from blockchain.currencies.ethereum.services.process_purchase import ProcessPurchase


class TestEthereum(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['token', 'crowdsale']

    def setUp(self):
        super().setUp()

        self.investor_address = self.account['address']
        self.investor = InvestorFactory(eth_account=self.investor_address)

    def test_process_purchase(self):
        self.pass_KYC(self.investor_address)

        txn_hash = self.call_crowsdsale_fallback(self.investor_address, int(1.23 * 10 ** 18))
        tokens_move = TokensMoveFactory(investor=self.investor,
                                        amount='90000',
                                        transfer__txn_hash=txn_hash)

        result = ProcessPurchase()(tokens_move)
        self.assertTrue(isinstance(result, Right))

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        payment = payments.first()
        self.assertEqual(result.value.payment, payment)

        self.assertEqual(payment.currency, 'ETH')
        self.assertEqual(payment.payer_account, self.investor_address)
        self.assertEqual(payment.amount, Decimal('1.23'))
        self.assertEqual(payment.amounti, Decimal('1230000000000000000'))
        self.assertEqual(payment.external_id, None)
        self.assertEqual(payment.txn_id, txn_hash)
        self.assertEqual(payment.received_at, self.utcnow)
        self.assertEqual(payment.tokens_move, tokens_move)

    def test_non_existing_event(self):
        txn_hash = self.mint_tokens(self.investor_address, 90000)
        tokens_move = TokensMoveFactory(investor=self.investor,
                                        amount='90000',
                                        transfer__txn_hash=txn_hash)

        result = ProcessPurchase()(tokens_move)

        self.assertTrue(isinstance(result, Right))
        self.assertEqual(result.value.payment, None)

        self.assertEqual(Payment.objects.count(), 0)
