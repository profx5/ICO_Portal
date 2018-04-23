from oslash import Right
from decimal import Decimal

from ..base import BlockChainTestCase
from ico_portal.utils.datetime import datetime
from user_office.models import Payment
from user_office.factories import *
from blockchain.currencies.ethereum.services.process_purchase import ProcessPurchase


class TestEthereum(BlockChainTestCase):
    investor_eth_address = '0xB0a3f48478d84a497f930d8455711d9981B66a70'

    def setUp(self):
        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

        self.investor = InvestorFactory.create(eth_account=self.investor_eth_address)

    def test_process_purchase(self):
        txn_hash = '0x3528ca76a93a02edd1f0b4aace3e45e63cd3d3ff277870e8d661a798a71f85e8'

        tokens_move = TokensMoveFactory(investor=self.investor,
                                         amount='90000',
                                         transfer__txn_hash=txn_hash)

        result = ProcessPurchase()(tokens_move)

        self.assertTrue(isinstance(result, Right))

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        payment = payments.first()
        self.assertEqual(result.value, payment)

        self.assertEqual(payment.currency, 'ETH')
        self.assertEqual(payment.payer_account, self.investor_eth_address)
        self.assertEqual(payment.amount, Decimal('1.23'))
        self.assertEqual(payment.amounti, Decimal('1230000000000000000'))
        self.assertEqual(payment.external_id, None)
        self.assertEqual(payment.txn_id, txn_hash)
        self.assertEqual(payment.received_at, self.utcnow)
        self.assertEqual(payment.tokens_move, tokens_move)

    def test_non_existing_event(self):
        txn_hash = '0x0ec78427e0fdb5d5fe9fb24f907ea9b3704775b720f1fee3c447ad28e276293f'

        tokens_move = TokensMoveFactory(investor=self.investor,
                                         amount='90000',
                                         transfer__txn_hash=txn_hash)

        result = ProcessPurchase()(tokens_move)

        self.assertTrue(isinstance(result, Right))
        self.assertEqual(result.value, None)

        self.assertEqual(Payment.objects.count(), 0)
