from blockchain.ico.contracts import CrowdsaleContract
from .create_transaction import CreateTransaction
from ico_portal.utils.service_object import ServiceObject, service_call


class BuyTokens(ServiceObject):
    def create_txn_data(self, context):
        txn_data = CrowdsaleContract().buy_tokens(to=context.to, usdc_value=context.usdc_value)

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return CreateTransaction()(context.txn_data) | \
            (lambda result: self.success(transaction=result.txn))

    @service_call
    def __call__(self, to, usdc_value):
        return self.success(to=to, usdc_value=usdc_value) | \
            self.create_txn_data | \
            self.create_transaction
