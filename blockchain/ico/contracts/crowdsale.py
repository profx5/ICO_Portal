from ico_portal.utils.datetime import datetime
from .base import BaseContract


class TokensPurchasedEvent:
    def __init__(self, event, value):
        self.investor = event['args']['investor']
        self.eth_price_in_cents = event['args']['ethPriceInCents']
        self.value_in_cents = event['args']['valueInCents']
        self.bonus_percent = event['args']['bonusPercent']
        self.bonus_ids = event['args']['bonusIds']
        self.txn_hash = event['transactionHash'].hex()
        self.contract_address = event['address']
        self.block_hash = event['blockHash'].hex()
        self.block_number = event['blockNumber']
        self.accepted_at = datetime.utcnow()
        self.value = value

    def __str__(self):
        return f'TokensPurchased at {self.txn_hash}'

    __repr__ = __str__


class CrowdsaleContract(BaseContract):
    compiled_file_path = '{BASE_DIR}/solidity-contracts/contracts/VeraCrowdsale.json'

    def get_cents_raised(self):
        return self.contract.functions.centsRaised().call()

    def pass_kyc(self, address):
        gas = 50000

        return self.contract.functions.addKycVerifiedInvestor(address).buildTransaction({
            'gas': gas
        })

    def buy_tokens(self, to, usdc_value):
        gas = 150000

        return self.contract.functions.buyTokensViaBackend(to, int(usdc_value)).buildTransaction({
            'gas': gas
        })

    def get_event_from_txn_hash(self, txn_hash):
        receipt = self.web3.eth.getTransactionReceipt(txn_hash)
        event = self.contract.events.TokenPurchase().processReceipt(receipt)

        if event:
            value = self.web3.eth.getTransaction(txn_hash).value

            return TokensPurchasedEvent(event[0], value)
