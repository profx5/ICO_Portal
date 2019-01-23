from oslash import Right

from blockchain.tests.currencies.test_erc20 import ERC20BlockchainTestCase
from blockchain.ico.contracts import DepositProxy
from blockchain.ico.services import ApproveKYC, SendPreparedTxns, TrackTransactions, \
    GetEvents, ProcessTransfer
from user_office.factories import InvestorFactory, KYCFactory
from user_office.models import Account, Transaction
from blockchain.currencies import Currencies


class TestStableCoinBuy(ERC20BlockchainTestCase):
    setup_eth_tester = True
    setup_contracts = ['erc20', 'token', 'crowdsale']

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

        # PROXY
        transaction = Transaction.objects.get(txn_id=kyc.deploy_txn_id)
        self.assertEqual(transaction.state, 'MINED')
        self.assertIsNotNone(transaction.txn_hash)

        receipt = self.web3.eth.getTransactionReceipt(transaction.txn_hash)
        self.assertEqual(receipt.status, 1)

        account = Account.objects.get(investor=investor, currency='PROXY')
        self.assertEqual(account.address, receipt.contractAddress)

        proxy_contract = DepositProxy(account.address)
        self.assertEqual(proxy_contract.contract.functions.investor().call(), investor.eth_account)
        self.assertEqual(proxy_contract.contract.functions.endPoint().call(), self.crowdsale_contract.address)

        # Process transfer
        tokens_amount = 150 * 10 ** 18
        self.mint_tokens(investor.eth_account, tokens_amount)
        transfer_txn_hash = self.transfer_tokens(
            investor.eth_account,
            proxy_contract.contract.address,
            tokens_amount
        )
        self.assertEqual(self.erc20.functions.balanceOf(proxy_contract.contract.address).call(), tokens_amount)

        dai_settings = Currencies.get_currency('DAI')
        result = dai_settings.events_getter()
        self.assertIsInstance(result, Right)
        self.assertEqual(len(result.value.entries), 2)

        result = dai_settings.transfers_processor(result.value.entries[1])
        self.assertIsInstance(result, Right)

        payment = result.value.payment

        self.assertEqual(payment.currency, 'DAI')
        self.assertEqual(payment.payer_account, proxy_contract.contract.address)
        self.assertEqual(payment.amount, 150)
        self.assertEqual(payment.amounti, tokens_amount)
        self.assertEqual(payment.external_id, transfer_txn_hash)
        self.assertEqual(payment.txn_id, transfer_txn_hash)
        self.assertEqual(payment.usdc_value, 15000)
        self.assertEqual(payment.rate_usdc, dai_settings.rate_usdc)

        transaction = Transaction.objects.get(txn_id=result.value.buy_txn_id)
        self.assertIsInstance(SendPreparedTxns()()[0], Right)
        self.assertIsInstance(TrackTransactions()()[0], Right)

        transaction.refresh_from_db()
        self.assertEqual(transaction.state, 'MINED')
        self.assertIsNotNone(transaction.txn_hash)

        receipt = self.web3.eth.getTransactionReceipt(transaction.txn_hash)
        self.assertEqual(receipt.status, 1)
        self.assertEqual(len(receipt.logs), 2)

        result = GetEvents()()
        self.assertIsInstance(result, Right)
        self.assertEqual(len(result.value.entries), 1)

        result = ProcessTransfer()(result.value.entries[0])
        self.assertIsInstance(result, Right)

        investor.refresh_from_db()
        self.assertEqual(investor.tokens_amount, tokens_amount)

        tokens_moves = investor.tokens_moves.all()
        self.assertEqual(tokens_moves.count(), 1)

        tokens_move = tokens_moves.first()
        self.assertEqual(tokens_move.amount, tokens_amount)
        self.assertEqual(tokens_move.direction, 'IN')
        self.assertEqual(tokens_move.state, 'ACTUAL')

        transfer = tokens_move.transfer
        self.assertEqual(transfer.txn_hash, result.value.event.txn_hash)
        self.assertEqual(transfer.amount, tokens_amount)

        self.assertEqual(self.erc20.functions.balanceOf(proxy_contract.contract.address).call(), 0)
        self.assertEqual(self.erc20.functions.balanceOf(self.crowdsale_contract.address).call(), tokens_amount)
        self.assertEqual(self.token_contract.functions.balanceOf(investor.eth_account).call(), tokens_amount)
