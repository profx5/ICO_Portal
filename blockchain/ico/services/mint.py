from blockchain.ico.contracts import TokenContract
from .create_transaction import CreateTransaction
from ico_portal.utils.service_object import ServiceObject, service_call


class Mint(ServiceObject):
    def create_txn_data(self, context):
        txn_data = TokenContract().mint(to=context.to, amount=context.amount)

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return CreateTransaction()(context.txn_data) | \
            (lambda result: self.success(transaction=result.txn))

    @service_call
    def __call__(self, to, amount):
        return self.success(to=to, amount=amount) | \
            self.create_txn_data | \
            self.create_transaction
