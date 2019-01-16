from web3.utils.filters import LogFilter
from web3.utils.events import get_event_data

from blockchain.ico.contracts.base import BaseContract
from ico_portal.utils.datetime import datetime


class DAIContract(BaseContract):
    compiled_file_path = '{BASE_DIR}/solidity-contracts/contracts/DSToken.json'

    def get_filter(self, from_block, to_block=None):
        return self.contract.events.Transfer.createFilter(
            fromBlock=from_block,
            toBlock=to_block,
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
