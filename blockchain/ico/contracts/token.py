from django.conf import settings
from web3.utils.filters import LogFilter
from web3.utils.events import get_event_data

from ico_portal.utils.datetime import datetime
from .base import BaseContract



class TokenContract(BaseContract):
    abi_file_path = '{BASE_DIR}/contracts/MintableToken.json'

    def get_total_supply(self):
        return self.contract.functions.totalSupply().call()

    def mint(self, to, amount):
        amount = int(amount)

        gas = 70000

        return self.contract.functions.mint(to, amount).buildTransaction({
            'gas': gas
        })

    def get_filter(self, from_block):
        return self.contract.events.Transfer.createFilter(fromBlock=from_block)

    @property
    def transfer_abi(self):
        return self.contract.events.Transfer._get_event_abi()


class TransferEvent:
    purchase_account = '0x0000000000000000000000000000000000000000'

    def __init__(self, entry):
        self.from_account = entry['args']['from']
        self.to_account = entry['args']['to']
        self.amount = entry['args']['value']
        self.txn_hash = entry['transactionHash'].hex()
        self.contract_address = entry['address']
        self.block_hash = entry['blockHash'].hex()
        self.block_number = entry['blockNumber']
        self.accepted_at = datetime.utcnow()
        self.removed = entry.get('removed')

    def __str__(self):
        return f'Transfer event at {self.txn_hash}'

    __repr__ = __str__

    @property
    def is_purchase(self):
        return self.from_account == self.purchase_account


class TransfersFilter(LogFilter):
    def log_entry_formatter(self, entry):
        data = get_event_data(TokenContract().transfer_abi, entry)

        return TransferEvent(data)
