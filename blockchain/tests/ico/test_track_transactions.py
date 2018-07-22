from oslash import Right
from decimal import Decimal
from django.conf import settings
from datetime import timedelta

from ico_portal.utils.datetime import datetime
from user_office.models import Transaction
from ..base import BlockChainTestCase
from blockchain.ico.services.track_transactions import SendPreparedTxns, TrackTransactions
from uuid import UUID


class _Base(BlockChainTestCase):
    setup_eth_tester = True

    txn_data = '0x40c10f19000000000000000000000000b0a3f48478d84a497f930d8455711d9981b66a7000000000000000000000000000000000000000000000000000000000000007ca'

    @property
    def sender_account(self):
        return settings.ETH_ACCOUNT['address']


class TestSendPreparedTxns(_Base):
    def test_successful_sending(self):
        transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                  gas=40000,
                                  data=self.txn_data)
        transaction.save()

        account_nonce = self.eth_tester.get_nonce(self.sender_account)

        result = SendPreparedTxns()()

        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)

        transactions = Transaction.objects.all()
        self.assertEqual(transactions.count(), 1)

        transaction = transactions.first()
        self.assertEqual(transaction.data, self.txn_data)
        self.assertEqual(transaction.value, Decimal('0'))
        self.assertEqual(transaction.from_account, self.sender_account)
        self.assertEqual(transaction.to_account, '0x2feB9363a9bb1E16Ab90F6d4007264774e959F34')
        self.assertEqual(transaction.gas, 40000)
        self.assertEqual(transaction.gas_price, Decimal('20000000000'))
        self.assertEqual(transaction.state, 'SENT')
        self.assertIsNone(transaction.fail_reason)
        self.assertEqual(transaction.created_at, self.utcnow)
        self.assertIsInstance(transaction.txn_id, UUID)
        self.assertEqual(transaction.nonce, account_nonce)

        txn = self.web3.eth.getTransaction(transaction.txn_hash)
        self.assertIsNotNone(txn)

        self.assertEqual(txn['from'], transaction.from_account)
        self.assertEqual(txn['to'], transaction.to_account)
        self.assertEqual(txn['gas'], transaction.gas)
        self.assertEqual(txn['gasPrice'], transaction.gas_price)
        self.assertEqual(txn['data'], transaction.data)
        self.assertEqual(txn['nonce'], transaction.nonce)
        self.assertEqual(txn['value'], 0)

    def test_with_existing_transaction_object(self):
        sent_transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                       gas=40000,
                                       data=self.txn_data)
        sent_transaction.save()
        result = SendPreparedTxns()()

        transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                  gas=40000,
                                  data=self.txn_data)

        transaction.save()

        result = SendPreparedTxns()()
        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)

        transaction.refresh_from_db()
        sent_transaction.refresh_from_db()

        self.assertEqual(transaction.nonce, sent_transaction.nonce + 1)

    def test_nonce_by_txn_count_calc(self):
        self.eth_tester.send_transaction({
            'from': self.sender_account,
            'to': '0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
            'gas': 21000,
            'value': 0,
        })

        txns_count = self.web3.eth.getTransactionCount(self.sender_account)

        transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                  gas=40000,
                                  data=self.txn_data)

        transaction.save()

        result = SendPreparedTxns()()
        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)

        transaction.refresh_from_db()
        self.assertEqual(transaction.nonce, txns_count)


class TestTrackTransactions(_Base):
    def test_resend_transaction(self):
        self.eth_tester.disable_auto_mine_transactions()
        filter_id = self.eth_tester.create_pending_transaction_filter()

        old_transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                      gas=40000,
                                      data=self.txn_data)
        old_transaction.save()
        result = SendPreparedTxns()()
        old_transaction.refresh_from_db()

        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)
        self.assertEqual(Transaction.objects.count(), 1)

        utcnow = datetime.utcnow() + timedelta(hours=1)
        self.stub_datetime_utcnow(utcnow)

        result = TrackTransactions()()
        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)
        self.assertEqual(Transaction.objects.count(), 2)

        new_transaction = Transaction.objects.exclude(id=old_transaction.id).first()

        pending_transactions = self.eth_tester.get_all_filter_logs(filter_id)
        self.assertEqual(len(pending_transactions), 1)
        self.assertEqual(new_transaction.txn_hash, pending_transactions[0])

        self.assertEqual(old_transaction.nonce, new_transaction.nonce)
        self.assertEqual(old_transaction.data, new_transaction.data)
        self.assertEqual(old_transaction.txn_id, new_transaction.txn_id)
        self.assertEqual(old_transaction.value, new_transaction.value)
        self.assertEqual(old_transaction.from_account, new_transaction.from_account)
        self.assertEqual(old_transaction.to_account, new_transaction.to_account)
        self.assertEqual(old_transaction.gas, new_transaction.gas)
        self.assertEqual(new_transaction.gas_price, Decimal('22000000000'))

    def test_mined_transaction(self):
        transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                  gas=40000,
                                  data=self.txn_data)
        transaction.save()
        result = SendPreparedTxns()()

        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)
        self.assertEqual(Transaction.objects.count(), 1)

        result = TrackTransactions()()

        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)
        self.assertEqual(Transaction.objects.count(), 1)

        transaction.refresh_from_db()
        self.assertEqual(transaction.state, 'MINED')
        self.assertEqual(transaction.block_number, self.web3.eth.blockNumber)
        self.assertIsNone(transaction.fail_reason)

    def test_not_expired_transaction(self):
        self.eth_tester.disable_auto_mine_transactions()

        transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                  gas=40000,
                                  data=self.txn_data)
        transaction.save()
        result = SendPreparedTxns()()

        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)
        self.assertEqual(Transaction.objects.count(), 1)

        result = TrackTransactions()()

        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)
        self.assertEqual(Transaction.objects.count(), 1)

        transaction.refresh_from_db()
        self.assertEqual(transaction.state, 'SENT')
        self.assertIsNone(transaction.block_number)
        self.assertIsNone(transaction.fail_reason)

    def test_mined_with_same_txn_id(self):
        mined_transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                        gas=40000,
                                        data=self.txn_data)
        mined_transaction.save()

        SendPreparedTxns()()
        TrackTransactions()()

        mined_transaction.refresh_from_db()
        self.assertEqual(mined_transaction.state, 'MINED')

        transaction = Transaction(to_account='0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
                                  gas=40000,
                                  data=self.txn_data,
                                  txn_id=mined_transaction.txn_id)
        transaction.save()
        SendPreparedTxns()()
        result = TrackTransactions()()

        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)

        transaction.refresh_from_db()
        self.assertEqual(transaction.state, 'FAILED')
        self.assertEqual(transaction.fail_reason, f'Other transaction with txn_hash={mined_transaction.txn_hash} already mined')
