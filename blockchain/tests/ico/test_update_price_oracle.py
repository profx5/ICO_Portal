from oslash import Right
from decimal import Decimal
from datetime import timedelta

from ..base import BlockChainTestCase
from blockchain.ico.services import UpdatePriceOracle, SendPreparedTxns, \
    TrackTransactions
from blockchain.ico.services.update_price_oracle import TooLowChange, PendingUpdateExists
from user_office.factories import ExchangeRateFactory
from user_office.models import POUpdate, Transaction


class TestUpdatePriceOracle(BlockChainTestCase):
    oracle_inital_price = 51012
    setup_eth_tester = True
    setup_contracts = ['price_oracle']

    def test_successfult_update(self):
        rate = ExchangeRateFactory(currency='ETH', rate=Decimal('532.20'))

        result = UpdatePriceOracle()()
        self.assertIsInstance(result, Right)
        self.assertNotIsInstance(result, TooLowChange)

        send_txn_result = SendPreparedTxns().send_prepared_transaction(result.value.transaction)
        self.assertIsInstance(send_txn_result, Right)

        self.assertEqual(self.price_oracle.functions.ethPriceInCents().call(), 53220)

        self.assertEqual(POUpdate.objects.count(), 1)
        po_update = POUpdate.objects.first()
        self.assertEqual(po_update.created_at, self.utcnow)
        self.assertEqual(po_update.oracle_rate, self.oracle_inital_price)
        self.assertEqual(po_update.actual_rate, rate.rate_cents)
        self.assertEqual(po_update.new_rate, rate.rate_cents)

    def test_pending_update(self):
        self.eth_tester.disable_auto_mine_transactions()
        ExchangeRateFactory(currency='ETH', rate=Decimal('532.20'))

        result_pending = UpdatePriceOracle()()
        self.assertIsInstance(result_pending, Right)
        self.assertEqual(POUpdate.objects.count(), 1)

        SendPreparedTxns()()
        TrackTransactions()()
        utcnow = self.utcnow + timedelta(hours=1)
        self.stub_datetime_utcnow(utcnow)
        TrackTransactions()()
        self.assertEqual(Transaction.objects.count(), 2)

        result_skip = UpdatePriceOracle()()
        self.assertIsInstance(result_skip, PendingUpdateExists)
        self.assertEqual(POUpdate.objects.count(), 1)

    def test_too_low_change(self):
        ExchangeRateFactory(currency='ETH', rate=Decimal('511.20'))

        result = UpdatePriceOracle()()
        self.assertIsInstance(result, TooLowChange)
        self.assertEqual(POUpdate.objects.count(), 0)

    def test_too_high_change(self):
        ExchangeRateFactory(currency='ETH', rate=Decimal('620.20'))

        result = UpdatePriceOracle()()
        self.assertIsInstance(result, Right)

        send_txn_result = SendPreparedTxns().send_prepared_transaction(result.value.transaction)
        self.assertIsInstance(send_txn_result, Right)

        self.assertEqual(self.price_oracle.functions.ethPriceInCents().call(), 56113)

        self.assertEqual(POUpdate.objects.count(), 1)
