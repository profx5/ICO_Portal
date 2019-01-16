from django.test import TestCase
from web3 import Web3, HTTPProvider, EthereumTesterProvider
from eth_tester import EthereumTester
from django.conf import settings

import blockchain.web3
from ico_portal.utils.datetime import datetime
from blockchain.ico.contracts import CrowdsaleContract, PriceOracle, TokensMediator
from blockchain.ico.contracts.token import TokenContract, TransferEvent
from django.apps import apps


class BlockChainTestCase(TestCase):
    crowdsale_tokens_amount = 10 ** 24

    oracle_inital_price = 55015
    oracle_allowed_change = 10
    oracle_sensivity = 3

    setup_eth_tester = False
    setup_contracts = []  # token, crowdsale, price_oracle

    def stub_datetime_now(self, dt):
        datetime.stubed_now = dt

    def stub_datetime_utcnow(self, dt):
        datetime.stubed_utcnow = dt

    @classmethod
    def _setup_account(cls):
        cls.account = settings.ETH_ACCOUNT

        cls.eth_tester.add_account(cls.account['private_key'])

        cls.eth_tester.send_transaction({
            'from': cls.eth_tester.get_accounts()[0],
            'to': cls.account['address'],
            'gas': 21000,
            'value': 100 * 10 ** 18,
        })

    @classmethod
    def _setup_token(cls):
        Coin = cls.web3.eth.contract(abi=TokenContract.get_compiled()['abi'],
                                     bytecode=TokenContract.get_compiled()['bin'])
        tx_hash = Coin.constructor().transact()
        tx_receipt = cls.web3.eth.getTransactionReceipt(tx_hash)
        cls.token_contract = cls.web3.eth.contract(address=tx_receipt.contractAddress,
                                                   abi=TokenContract.get_compiled()['abi'])

        TokenContract.init({'address': cls.token_contract.address})

    @classmethod
    def _setup_crowdsale(cls):
        Crowdsale = cls.web3.eth.contract(abi=CrowdsaleContract.get_compiled()['abi'],
                                          bytecode=CrowdsaleContract.get_compiled()['bin'])
        tx_hash = Crowdsale.constructor(1, cls.token_contract.address).transact()
        tx_receipt = cls.web3.eth.getTransactionReceipt(tx_hash)
        cls.crowdsale_contract = cls.web3.eth.contract(address=tx_receipt.contractAddress,
                                                       abi=CrowdsaleContract.get_compiled()['abi'])

        CrowdsaleContract.init({'address': cls.crowdsale_contract.address})
        TokensMediator.init({'endpoint_address': cls.crowdsale_contract.address})

    @classmethod
    def _setup_price_oracle(cls):
        oracle = cls.web3.eth.contract(abi=PriceOracle.get_compiled()['abi'],
                                       bytecode=PriceOracle.get_compiled()['bin'])
        tx_hash = oracle.constructor(cls.oracle_inital_price, cls.oracle_allowed_change).transact()
        tx_receipt = cls.web3.eth.getTransactionReceipt(tx_hash)
        cls.price_oracle = cls.web3.eth.contract(address=tx_receipt.contractAddress,
                                                 abi=PriceOracle.get_compiled()['abi'])
        cls.price_oracle.functions.addOracle(cls.web3.eth.defaultAccount).transact()

        PriceOracle.init({'address': cls.price_oracle.address,
                          'sensivity': cls.oracle_sensivity})

    @classmethod
    def _setup_contracts(cls):
        cls.web3.eth.defaultAccount = cls.account['address']

        for c in cls.setup_contracts:
            getattr(cls, f'_setup_{c}')()

    @classmethod
    def take_snapshot(cls):
        return cls.eth_tester.take_snapshot()

    @classmethod
    def patch_web3(cls):
        blockchain.web3._web3_instance = cls.web3

    @classmethod
    def setUpTestData(cls):
        if cls.setup_eth_tester:
            cls.eth_tester = EthereumTester()
            cls.web3 = Web3(EthereumTesterProvider(cls.eth_tester))
            cls.patch_web3()

            cls._setup_account()
            cls._setup_contracts()
            cls.setup_blockchain_data()

            cls.base_snapshot_id = cls.take_snapshot()
        else:
            cls.web3 = Web3(HTTPProvider(settings.WEB3_RPC_URL))

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

        if cls.setup_eth_tester:
            apps.get_app_config('blockchain').init_contracts()

    @classmethod
    def setup_blockchain_data(cls):
        pass

    def setUp(self):
        if self.setup_eth_tester:
            self.eth_tester.enable_auto_mine_transactions()
            self.eth_tester.revert_to_snapshot(self.base_snapshot_id)

        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

    def pass_KYC(self, address):
        self.crowdsale_contract.functions.addKycVerifiedInvestor(address).transact()

    def mint_tokens(self, to, amount):
        return self.token_contract.functions.mint(to, amount).transact({
            'gas': 100000,
            'from': self.account['address']
        }).hex()

    def transfer_tokens(self, from_acc, to_acc, amount):
        return self.token_contract.functions.transfer(to_acc, amount).transact({
            'gas': 100000,
            'from': from_acc
        }).hex()

    def process_payment(self, payer, usdc_amount):
        return self.crowdsale_contract.functions.processPayment(payer, usdc_amount).transact({
            'gas': 100000,
            'from': self.account['address']
        })

    def get_transfer_event(self, txn_hash):
        receipt = self.web3.eth.getTransactionReceipt(txn_hash)
        raw_event = TokenContract().contract.events.Transfer().processReceipt(receipt)[0]

        return TransferEvent(raw_event)
