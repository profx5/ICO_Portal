from oslash import Right, Left
from unittest.mock import Mock
from django.conf import settings

from ..base import BlockChainTestCase
from user_office.factories import InvestorFactory
from user_office.signals import txn_mined
from user_office.models import Transaction
from blockchain.ico.services import CreateMediatorContract, SendPreparedTxns, TrackTransactions
from blockchain.ico.contracts import TokensMediator


class TestApproveMinedKYC(BlockChainTestCase):
    setup_eth_tester = True

    def test_create_contract(self):
        account = self.eth_tester.get_accounts()[-1]
        investor = InvestorFactory(eth_account=account)

        result = CreateMediatorContract()(investor)

        self.assertIsInstance(result, Right)

        transactions = Transaction.objects.all()
        self.assertEqual(transactions.count(), 1)

        transaction = transactions.first()
        self.assertEqual(transaction.txn_type, 'CREATE_MEDIATOR')
        self.assertEqual(transaction.state, 'PREPARED')

        txn_mined_receiver = Mock()
        txn_mined.connect(txn_mined_receiver)

        SendPreparedTxns()()
        TrackTransactions()()

        txn_mined_receiver.assert_called_once()
        transaction.refresh_from_db()
        self.assertEqual(transaction.txn_type, 'CREATE_MEDIATOR')
        self.assertEqual(transaction.state, 'MINED')

        contract_address = self.web3.eth.getTransactionReceipt(transaction.txn_hash).contractAddress
        mediator = TokensMediator(contract_address)

        self.assertEqual(mediator.contract.functions.investor().call(), account)
        self.assertEqual(mediator.contract.functions.endPoint().call(),
                         settings.MEDIATOR_CONTRACT['endpoint_address'])
