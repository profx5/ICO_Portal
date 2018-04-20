from decimal import Decimal

from ico_portal.utils.datetime import datetime


class Event:
    def __init__(self, event):
        self.payer = event['args']['to']
        self.value = Decimal(event['args']['amount'])
        self.txn_hash = event['transactionHash'].hex()
        self.contract_address = event['address']
        self.block_hash = event['blockHash'].hex()
        self.block_number = event['blockNumber']
        self.accepted_at = datetime.utcnow()

    def __str__(self):
        return f'Event at block {self.block_number} with txn {self.block_hash}'

    __repr__ = __str__
