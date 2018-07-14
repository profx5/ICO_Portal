import json
from django.conf import settings
from blockchain.web3 import get_web3


class BaseContract:
    @classmethod
    def get_compiled(cls):
        if not hasattr(cls, '_compile'):
            with open(cls.compiled_file_path.format(BASE_DIR=settings.BASE_DIR)) as f:
                cls._compiled = json.load(f)

        return cls._compiled

    @classmethod
    def init(cls, contract_address):
        cls.contract_address = contract_address

    @property
    def web3(self):
        return get_web3()

    @property
    def contract(self):
        return self.web3.eth.contract(abi=self.get_compiled()['abi'],
                                      address=self.contract_address)


class ContractTransact:
    def __init__(self, contract, txn_data):
        self.contract = contract
        self.txn_data = txn_data

        self.web3 = contract.web3

    def get_nonce(self):
        return self.web3.eth.getTransactionCount(self.contract.sender_address)

    def sign(self):
        nonce = self.get_nonce()

        self.signed = self.web3.eth.account.signTransaction(
            dict(self.txn_data, nonce=nonce), self.contract.private_key)

        return self.signed

    @property
    def txn_hash(self):
        return self.signed['hash'].hex()

    def send(self):
        if not hasattr(self, 'signed'):
            self.sign()

        return self.web3.eth.sendRawTransaction(self.signed['rawTransaction'])
