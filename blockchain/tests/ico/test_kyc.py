import django.core.mail
from oslash import Right, Left

from user_office.factories import InvestorFactory, KYCFactory
from ..base import BlockChainTestCase
from blockchain.ico.services import ApproveKYC, SendPreparedTxns, DeclineKYC, TrackTransactions
from user_office.models import Transaction


class TestApproveMinedKYC(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['price_oracle', 'token', 'crowdsale']

    def test_approve_kyc(self):
        account = self.eth_tester.get_accounts()[-1]
        investor = InvestorFactory(eth_account=account)
        kyc = KYCFactory(investor=investor, state='WAITING')

        result = ApproveKYC()(kyc)
        self.assertIsInstance(result, Right)

        SendPreparedTxns()()

        result = TrackTransactions()()

        self.assertEqual(result[0].value.txn_object.txn_type, "PASS_KYC")
        self.assertEqual(result[0].value.txn_object.state, "MINED")

        self.assertTrue(
            self.crowdsale_contract.functions.hasRole(account, 'kycVerified').call()
        )

        kyc.refresh_from_db()

        self.assertEqual(kyc.state, 'APPROVED')

        sent_mails = django.core.mail.outbox
        self.assertEqual(len(sent_mails), 1)
        self.assertEqual(sent_mails[0].subject, 'Your KYC request was approved')

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
