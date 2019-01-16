import django.core.mail
from oslash import Right, Left

from user_office.factories import InvestorFactory, KYCFactory
from ..base import BlockChainTestCase
from blockchain.ico.services import ApproveKYC, SendPreparedTxns, DeclineKYC, TrackTransactions
from user_office.models import Transaction, Account


class TestApproveMinedKYC(BlockChainTestCase):
    setup_eth_tester = True

    def test_approve_kyc(self):
        account = self.eth_tester.get_accounts()[-1]
        investor = InvestorFactory(eth_account=account)
        kyc = KYCFactory(investor=investor, state='WAITING')

        result = ApproveKYC()(kyc)
        self.assertIsInstance(result, Right)

        kyc.refresh_from_db()
        self.assertEqual(kyc.state, 'DEPLOYING')

        SendPreparedTxns()()

        result = TrackTransactions()()
        self.assertIsInstance(result[0], Right)
        transaction = result[0].value.txn_object

        self.assertEqual(transaction.txn_type, "CREATE_MEDIATOR")
        self.assertEqual(transaction.state, "MINED")

        kyc.refresh_from_db()

        self.assertEqual(kyc.state, 'APPROVED')
        self.assertEqual(kyc.deploy_txn_id, transaction.txn_id)

        sent_mails = django.core.mail.outbox
        self.assertEqual(len(sent_mails), 1)
        self.assertEqual(sent_mails[0].subject, 'Your KYC request was approved')

        contract_address = self.web3.eth.getTransactionReceipt(transaction.txn_hash).contractAddress
        accounts = Account.objects.all()
        self.assertEqual(accounts.count(), 1)

        account = accounts.first()
        self.assertEqual(account.address, contract_address)
        self.assertEqual(account.currency, 'MEDIATOR')
        self.assertEqual(account.investor, investor)

    def test_already_approved_kyc(self):
        account = self.eth_tester.get_accounts()[-1]
        investor = InvestorFactory(eth_account=account)
        kyc = KYCFactory(investor=investor, state='APPROVED')

        result = ApproveKYC()(kyc)

        self.assertIsInstance(result, Left)
        self.assertEqual(Transaction.objects.count(), 0)

        kyc.refresh_from_db()
        self.assertEqual(kyc.state, 'APPROVED')


class TestDeclineKYC(BlockChainTestCase):
    def test_approve_kyc(self):
        investor = InvestorFactory()
        kyc = KYCFactory(investor=investor, state='WAITING')

        result = DeclineKYC()(kyc)

        self.assertIsInstance(result, Right)

        kyc.refresh_from_db()
        self.assertEqual(kyc.state, 'DECLINED')

        sent_mails = django.core.mail.outbox
        self.assertEqual(len(sent_mails), 1)
        self.assertEqual(sent_mails[0].subject, 'Your KYC request was declined')

    def test_already_declined_kyc(self):
        investor = InvestorFactory()
        kyc = KYCFactory(investor=investor, state='DECLINED')

        result = DeclineKYC()(kyc)

        self.assertIsInstance(result, Left)
        self.assertEqual(Transaction.objects.count(), 0)

        kyc.refresh_from_db()
        self.assertEqual(kyc.state, 'DECLINED')
