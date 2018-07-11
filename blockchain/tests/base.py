import json
from django.test import TestCase
from web3 import Web3, HTTPProvider, EthereumTesterProvider
from eth_tester import EthereumTester
from django.conf import settings

import blockchain.web3
from ico_portal.utils.datetime import datetime
from blockchain.ico.contracts.crowdsale import CrowdsaleContract
from blockchain.ico.contracts.token import TokenContract, TransferEvent


class BlockChainTestCase(TestCase):
    _compiled_contracts_path = f'{settings.BASE_DIR}/solidity-contracts/contracts/compiled.json'
    crowdsale_eth_usdc = 55015
    crowdsale_bonus_percents = 40

    setup_eth_tester = False

    def stub_datetime_now(self, dt):
        datetime.stubed_now = dt

    def stub_datetime_utcnow(self, dt):
        datetime.stubed_utcnow = dt

    @classmethod
    def _get_compiled_contracts(cls):
        with open(cls._compiled_contracts_path, 'r') as f:
            return json.load(f)

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
    def _setup_contracts(cls):
        cls.web3.eth.defaultAccount = cls.eth_tester.get_accounts()[0]
        compiled = cls._get_compiled_contracts()

        token_interface = compiled['<stdin>:MintableToken']

        MintableToken = cls.web3.eth.contract(abi=token_interface['abi'],
                                              bytecode=token_interface['bin'])
        tx_hash = MintableToken.constructor().transact()
        tx_receipt = cls.web3.eth.getTransactionReceipt(tx_hash)

        cls.token_contract = cls.web3.eth.contract(address=tx_receipt.contractAddress,
                                                   abi=token_interface['abi'])

        crowdsale_interface = compiled['<stdin>:KYCCrowdsale']
        KYCCrowdsale = cls.web3.eth.contract(abi=crowdsale_interface['abi'],
                                             bytecode=crowdsale_interface['bin'])

        tx_hash = KYCCrowdsale.constructor(cls.web3.eth.accounts[0],
                                           cls.token_contract.address,
                                           cls.crowdsale_bonus_percents,
                                           cls.crowdsale_eth_usdc).transact()
        tx_receipt = cls.web3.eth.getTransactionReceipt(tx_hash)

        cls.crowdsale_contract = cls.web3.eth.contract(address=tx_receipt.contractAddress,
                                                       abi=crowdsale_interface['abi'])

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
    def setup_blockchain_data(cls):
        pass

    def setUp(self):
        if self.setup_eth_tester:
            self.eth_tester.revert_to_snapshot(self.base_snapshot_id)
            self.eth_tester.enable_auto_mine_transactions()

            TokenContract.init(contract_address=self.token_contract.address)
            CrowdsaleContract.init(contract_address=self.crowdsale_contract.address)

        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

    def tearDown(self):
        if self.setup_eth_tester:
            CrowdsaleContract.init(contract_address=settings.CROWDSALE_CONTRACT['address'])
            TokenContract.init(contract_address=settings.TOKEN_CONTRACT['address'])

    def pass_KYC(self, address):
        self.crowdsale_contract.functions.passKYC(address).transact()

    def call_crowsdsale_fallback(self, sender, value):
        return self.web3.eth.sendTransaction({
            'from': sender,
            'to': self.crowdsale_contract.address,
            'value': value,
            'gas': 100000
        }).hex()

    def mint_tokens(self, to, amount):
        return self.token_contract.functions.mint(to, amount).transact({
            'gas': 100000
        }).hex()

    def transfer_tokens(self, from_acc, to_acc, amount):
        return self.token_contract.functions.transfer(to_acc, amount).transact({
            'gas': 100000,
            'from': from_acc
        }).hex()

    def get_transfer_event(self, txn_hash):
        receipt = self.web3.eth.getTransactionReceipt(txn_hash)
        raw_event = TokenContract().contract.events.Transfer().processReceipt(receipt)[0]

        return TransferEvent(raw_event)
