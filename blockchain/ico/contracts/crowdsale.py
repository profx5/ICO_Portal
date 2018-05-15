from oslash import Right, Left, Just, Nothing

from ico_portal.utils.datetime import datetime
from ico_portal.utils.singleton import SingletonType
from .base import BaseContract, ContractTransact


class TokensPurchasedEvent:
    def __init__(self, event):
        self.investor = event['args']['investor']
        self.wei_amount = event['args']['weiAmount']
        self.tokens = event['args']['tokens']
        self.txn_hash = event['transactionHash'].hex()
        self.contract_address = event['address']
        self.block_hash = event['blockHash'].hex()
        self.block_number = event['blockNumber']
        self.accepted_at = datetime.utcnow()

    def __str__(self):
        return f'TokensPurchased at {self.txn_hash}'

    __repr__ = __str__


class CrowdsaleContract(BaseContract, metaclass=SingletonType):
    abi_file_path = '{BASE_DIR}/contracts/KYCCrowdsale.json'

    def pass_kyc(self, address):
        gas = 50000

        return ContractTransact(self, self.contract.functions.passKYC(address).buildTransaction({
            'gas': gas,
            'from': self.sender_address
        }))

    def get_event_from_txn_hash(self, txn_hash):
        receipt = self.web3.eth.getTransactionReceipt(txn_hash)

        raw_event = self.contract.events.TokensPurchased().processReceipt(receipt)

        if raw_event:
            return Just(TokensPurchasedEvent(raw_event[0]))
        else:
            return Nothing()
