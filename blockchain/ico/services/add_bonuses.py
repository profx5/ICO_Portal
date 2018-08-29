from blockchain.ico.contracts import CrowdsaleContract
from .create_transaction import CreateTransaction
from ico_portal.utils.service_object import ServiceObject, service_call


class AddBonuses(ServiceObject):
    def create_txn_data(self, context):
        txn_data = CrowdsaleContract().add_bonuses(to=context.to, tokens_amount=context.tokens_amount)

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return CreateTransaction()(context.txn_data) | \
            (lambda result: self.success(transaction=result.txn))

    @service_call
    def __call__(self, to, tokens_amount):
        return self.success(to=to, tokens_amount=tokens_amount) | \
            self.create_txn_data | \
            self.create_transaction
