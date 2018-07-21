from oslash import Right
from decimal import Decimal

from ..base import BlockChainTestCase
from user_office.models import Payment
from user_office.factories import InvestorFactory, TokensMoveFactory, PaymentFactory
from blockchain.currencies.ethereum.services.process_purchase import ProcessPurchase
from blockchain.ico.contracts import CrowdsaleContract


class TestEthereum(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['price_oracle', 'token', 'crowdsale']

    def setUp(self):
        super().setUp()

        self.investor_address = self.account['address']
        self.investor = InvestorFactory(eth_account=self.investor_address)

    def test_process_purchase(self):
        self.pass_KYC(self.investor_address)

        txn_hash = self.call_crowsdsale_fallback(self.investor_address, int(20 * 10 ** 18))
        event = CrowdsaleContract().get_event_from_txn_hash(txn_hash)
        tokens_move = TokensMoveFactory(investor=self.investor,
                                        amount='90000',
                                        transfer__txn_hash=txn_hash)

        result = ProcessPurchase()(tokens_move, event)
        self.assertTrue(isinstance(result, Right))

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        payment = payments.first()
        self.assertEqual(result.value.payment, payment)

        self.assertEqual(payment.currency, 'ETH')
        self.assertEqual(payment.payer_account, self.investor_address)
        self.assertEqual(payment.amount, Decimal('20'))
        self.assertEqual(payment.amounti, Decimal('20000000000000000000'))
        self.assertEqual(payment.external_id, None)
        self.assertEqual(payment.txn_id, txn_hash)
        self.assertEqual(payment.received_at, self.utcnow)
        self.assertEqual(payment.tokens_move, tokens_move)
        self.assertEqual(payment.usdc_value, Decimal('1100300'))
        self.assertEqual(payment.rate_usdc, self.oracle_inital_price)
        self.assertEqual(payment.bonus_percent, 20)
        self.assertEqual(payment.bonus_ids, 1)

    def test_process_w_existing_payment(self):
        self.pass_KYC(self.investor_address)

        txn_hash = self.call_crowsdsale_fallback(self.investor_address, int(20 * 10 ** 18))
        event = CrowdsaleContract().get_event_from_txn_hash(txn_hash)
        tokens_move = TokensMoveFactory(investor=self.investor,
                                        amount='90000',
                                        transfer__txn_hash=txn_hash)

        payment = PaymentFactory(tokens_move=tokens_move,
                                 currency='ETH',
                                 payer_account=self.investor_address,
                                 amount=20,
                                 amounti=20 * 10 ** 18,
                                 external_id=None,
                                 txn_id=txn_hash,
                                 rate_usdc=self.oracle_inital_price,
                                 usdc_value=Decimal('1100300'))

        result = ProcessPurchase()(tokens_move, event)
        self.assertTrue(isinstance(result, Right))

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        payment = payments.first()
        self.assertEqual(result.value.payment, payment)

        self.assertEqual(payment.currency, 'ETH')
        self.assertEqual(payment.payer_account, self.investor_address)
        self.assertEqual(payment.amount, Decimal('20'))
        self.assertEqual(payment.amounti, Decimal('20000000000000000000'))
        self.assertEqual(payment.external_id, None)
        self.assertEqual(payment.txn_id, txn_hash)
        self.assertEqual(payment.received_at, self.utcnow)
        self.assertEqual(payment.tokens_move, tokens_move)
        self.assertEqual(payment.usdc_value, Decimal('1100300'))
        self.assertEqual(payment.rate_usdc, self.oracle_inital_price)
        self.assertEqual(payment.bonus_percent, 20)
        self.assertEqual(payment.bonus_ids, 1)
