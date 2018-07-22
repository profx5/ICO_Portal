from oslash import Right, Left

from user_office.factories import InvestorFactory, KYCFactory
from ..base import BlockChainTestCase
from blockchain.ico.services import ApproveKYC, SendPreparedTxns
from user_office.models import Transaction


class TestApproveKYC(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['price_oracle', 'token', 'crowdsale']

    def test_approve_kyc(self):
        account = self.eth_tester.get_accounts()[-1]
        investor = InvestorFactory(eth_account=account)
        kyc = KYCFactory(investor=investor, state='WAITING')

        result = ApproveKYC()(kyc)

        self.assertIsInstance(result, Right)

        kyc.refresh_from_db()
        self.assertEqual(kyc.state, 'APPROVED')

        SendPreparedTxns()()

        self.assertTrue(
            self.crowdsale_contract.functions.hasRole(account, 'kycVerified').call()
        )

    def test_already_approved_kyc(self):
        account = self.eth_tester.get_accounts()[-1]
        investor = InvestorFactory(eth_account=account)
        kyc = KYCFactory(investor=investor, state='APPROVED')

        result = ApproveKYC()(kyc)

        self.assertIsInstance(result, Left)
        self.assertEqual(Transaction.objects.count(), 0)

        kyc.refresh_from_db()
        self.assertEqual(kyc.state, 'APPROVED')
