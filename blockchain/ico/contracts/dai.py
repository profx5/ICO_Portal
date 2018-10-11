from web3.utils.filters import LogFilter
from web3.utils.events import get_event_data
from django.conf import settings

from .base import BaseContract
from ico_portal.utils.datetime import datetime


class DAIContract(BaseContract):
    compiled_file_path = '{BASE_DIR}/solidity-contracts/contracts/DSToken.json'

    def get_event_from_txn_hash(self, txn_hash):
        receipt = self.web3.eth.getTransactionReceipt(txn_hash)

        if not receipt:
            self.logger.error(f'TXN receipt for transaction {txn_hash} not found')

            return None

        event = self.contract.events.Transfer().processReceipt(receipt)
        if event:
            value = self.web3.eth.getTransaction(txn_hash).value

            return TokensPurchasedEvent(event[0], value)

    def get_filter(self, dst, from_block, to_block=None):
        return self.contract.events.Transfer.createFilter(
            fromBlock=from_block,
            toBlock=to_block,
            argument_filters={'dst': dst}
        )

    @property
    def transfer_abi(self):
        return self.contract.events.Transfer._get_event_abi()


class DAITransferEvent:
    def __init__(self, entry):
        self.from_account = entry['args']['src']
        self.to_account = entry['args']['dst']
        self.amount = entry['args']['wad']
        self.txn_hash = entry['transactionHash'].hex()
        self.contract_address = entry['address']
        self.block_hash = entry['blockHash'].hex()
        self.block_number = entry['blockNumber']
        self.accepted_at = datetime.utcnow()
        self.removed = entry.get('removed', False)

    def __str__(self):
        return f'Transfer event at {self.txn_hash}'

    __repr__ = __str__


class DAITransfersFilter(LogFilter):
    def log_entry_formatter(self, entry):
        data = get_event_data(DAIContract().transfer_abi, entry)

        return DAITransferEvent(data)
