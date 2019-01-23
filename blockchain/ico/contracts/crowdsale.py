from ico_portal.utils.datetime import datetime
from .base import BaseContract


class CrowdsaleContract(BaseContract):
    abi = '[{"constant": false, "inputs": [{"name": "mediatorAddress", "type": "address"},' \
           '{"name": "tokenAddress", "type": "address"}, {"name": "tokensAmount", "type": "uint256"}, ' \
           '{"name": "USDcAmount", "type": "uint256"}], "name": "processPayment", "outputs": [], "payable":false, "stateMutability":"nonpayable", "type":"function"},' \
           '{"constant": true, "inputs": [], "name":"USDcRaised", "outputs":[{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}]'

    def get_cents_raised(self):
        return self.contract.functions.USDcRaised().call()

    def process_payment(self, mediator_address, token_address, tokens_amount, usdc_amount):
        gas = 150000

        return self.contract.functions.processPayment(
            mediator_address,
            token_address,
            tokens_amount,
            usdc_amount
        ).buildTransaction({'gas': gas})
