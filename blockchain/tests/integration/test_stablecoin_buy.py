from oslash import Right

from blockchain.tests.currencies.test_dai import DAIBlockchainTestCase
from blockchain.ico.contracts import TokensMediator
from blockchain.ico.services import ApproveKYC, SendPreparedTxns, TrackTransactions
from user_office.factories import InvestorFactory, KYCFactory
from user_office.models import Account, Transaction
from blockchain.currencies import Currencies


class TestStableCoinBuy(DAIBlockchainTestCase):
    setup_eth_tester = True
    setup_contracts = ['dai', 'token', 'crowdsale']

    def test_successful_buy(self):
        investor = InvestorFactory(eth_account=self.eth_tester.get_accounts()[-1])

        # KYC
        kyc = KYCFactory(investor=investor, state='PREPARED')

        self.assertIsInstance(ApproveKYC()(kyc), Right)
        self.assertIsInstance(SendPreparedTxns()()[0], Right)
        self.assertIsInstance(TrackTransactions()()[0], Right)

        kyc.refresh_from_db()
        self.assertEqual(kyc.state, 'APPROVED')
        self.assertIsNotNone(kyc.deploy_txn_id)

        transaciton = Transaction.objects.get(txn_id=kyc.deploy_txn_id)
        self.assertEqual(transaciton.state, 'MINED')
        self.assertIsNotNone(transaciton.txn_hash)

        receipt = self.web3.eth.getTransactionReceipt(transaciton.txn_hash)
        self.assertEqual(receipt.status, 1)

        account = Account.objects.get(investor=investor, currency='MEDIATOR')
        self.assertEqual(account.address, receipt.contractAddress)

        mediator_contract = TokensMediator(account.address)
        self.assertEqual(mediator_contract.contract.functions.investor().call(), investor.eth_account)
        self.assertEqual(mediator_contract.contract.functions.endPoint().call(), self.crowdsale_contract.address)

        tokens_amount = 150 * 10 ** 18
        self.mint_tokens(investor.eth_account, tokens_amount)
        transfer_txn_hash = self.transfer_tokens(
            investor.eth_account,
            mediator_contract.contract.address,
            tokens_amount
        )

        dai_settings = Currencies.get_currency('DAI')
        result = dai_settings.events_getter()
        self.assertIsInstance(result, Right)
        self.assertEqual(len(result.value.entries), 1)

        result = dai_settings.transfers_processor(result.value.entries[0])
        self.assertIsInstance(result, Right)

        payment = result.value.payment

        self.assertEqual(payment.currency, 'DAI')
        self.assertEqual(payment.payer_account, mediator_contract.contract.address)
        self.assertEqual(payment.amount, 150)
        self.assertEqual(payment.amounti, tokens_amount)
        self.assertEqual(payment.external_id, transfer_txn_hash)
        self.assertEqual(payment.txn_id, transfer_txn_hash)
        self.assertEqual(payment.usdc_value, 15000)
        self.assertEqual(payment.rate_usdc, dai_settings.rate_usdc)

        transaction = Transaction.objects.get(txn_id=result.value.buy_txn_id)
        self.assertIsInstance(SendPreparedTxns()()[0], Right)
        self.assertIsInstance(TrackTransactions()()[0], Right)

        import ipdb; ipdb.set_trace()
