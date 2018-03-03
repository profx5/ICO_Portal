from datetime import datetime
from decimal import Decimal

class Event:
    def __init__(self, event):
        self.payer = event['args']['_from']
        self.value = Decimal(event['args']['_value'])
        self.txn_hash = event['transactionHash'].hex()
        self.contract_address = event['address']
        self.block_hash = event['blockHash'].hex()
        self.block_number = event['blockNumber']
        self.accepted_at = datetime.utcnow()
