from django.conf import settings


class BaseContract:
    @classmethod
    def get_abi(cls):
        with open(cls.abi_file_path.format(BASE_DIR=settings.BASE_DIR)) as f:
            return f.read()

    @classmethod
    def init(cls, web3, contract_address, account):
        cls.web3 = web3
        cls.contract = web3.eth.contract(abi=cls.get_abi(),
                                         address=contract_address)
        cls.private_key = account['private_key']
        cls.sender_address = account['address']


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
