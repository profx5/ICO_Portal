from ico_portal.utils.datetime import datetime
from .base import BaseContract


class TokensPurchasedEvent:
    def __init__(self, event, value):
        self.investor = event['args']['payer']
        self.txn_hash = event['transactionHash'].hex()
        self.value_in_cents = event['args']['USDcAmount']
        self.contract_address = event['address']
        self.block_hash = event['blockHash'].hex()
        self.block_number = event['blockNumber']
        self.accepted_at = datetime.utcnow()
        self.value = value

    def __str__(self):
        return f'TokensPurchased at {self.txn_hash}'

    __repr__ = __str__


class CrowdsaleContract(BaseContract):
    compiled_file_path = '{BASE_DIR}/solidity-contracts/contracts/TingesMinter.json'

    def get_cents_raised(self):
        return self.contract.functions.USDcRaised().call()

    def buy_tokens(self, mediator_address, token_address, tokens_amount, usdc_amount):
        gas = 150000

        return self.contract.functions.processPayment(
            mediator_address,
            token_address,
            tokens_amount,
            usdc_amount
        ).buildTransaction({'gas': gas})

    def get_event_from_txn_hash(self, txn_hash):
        receipt = self.web3.eth.getTransactionReceipt(txn_hash)

        if not receipt:
            self.logger.error(f'TXN receipt for transaction {txn_hash} not found')

            return None

        event = self.contract.events.TokenPurchase().processReceipt(receipt)
        if event:
            value = self.web3.eth.getTransaction(txn_hash).value

            return TokensPurchasedEvent(event[0], value)
