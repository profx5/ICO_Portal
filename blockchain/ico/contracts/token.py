from django.conf import settings

from ico_portal.utils.singleton import SingletonType
from ico_portal.utils.datetime import datetime
from .base import BaseContract, ContractTransact


EVENT_NAME = 'Transfer'


class TokenContract(BaseContract, metaclass=SingletonType):
    abi_file_path = '{BASE_DIR}/contracts/MintableToken.json'

    def get_total_supply(self):
        return self.contract.functions.totalSupply().call()

    def mint(self, to, amount):
        amount = int(amount)

        gas = 40000

        return ContractTransact(self, self.contract.functions.mint(to, amount).buildTransaction({
            'gas': gas,
            'from': self.sender_address
        }))

    def get_events_filter(self):
        if getattr(self, '_events_filter', None) is None:
            self._events_filter = getattr(self.contract.events, EVENT_NAME)\
                .createFilter(fromBlock='latest')

        return self._events_filter


class TransferEvent:
    purchase_account = '0x0000000000000000000000000000000000000000'

    def __init__(self, event):
        self.account_from = event['args']['from']
        self.account_to = event['args']['to']
        self.amount = event['args']['value']
        self.txn_hash = event['transactionHash'].hex()
        self.contract_address = event['address']
        self.block_hash = event['blockHash'].hex()
        self.block_number = event['blockNumber']
        self.accepted_at = datetime.utcnow()

    def __str__(self):
        return f'Transfer event at {self.txn_hash}'

    __repr__ = __str__

    @property
    def is_purchase(self):
        return self.account_from == self.purchase_account
