from oslash import Right

from ..base import BlockChainTestCase
from blockchain.ico.services import CreateTransaction
from user_office.models import Transaction


class TestCreateTransaction(BlockChainTestCase):
    def test_successful_creation(self):
        txn_data = {
            'chainId': None,
            'data': '0x40c10f1900000000000000000000000073015966604928a312f79f7e69291a656cb8860200000000000000000000000000000000000000000000000000000000000003e8',
            'gas': 400000,
            'gasPrice': 1000000000,
            'to': '0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
            'value': 0}

        result = CreateTransaction()(txn_data)
        self.assertIsInstance(result, Right)

        transactions = Transaction.objects.all()
        self.assertEqual(transactions.count(), 1)

        transaction = transactions.first()
        self.assertEqual(transaction, result.value.txn)
        self.assertEqual(transaction.data, txn_data['data'])
        self.assertEqual(transaction.gas, txn_data['gas'])
        self.assertEqual(transaction.to_account, txn_data['to'])
        self.assertEqual(transaction.value, txn_data['value'])
        self.assertEqual(transaction.state, 'PREPARED')
