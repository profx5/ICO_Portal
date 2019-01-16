from blockchain.ico.contracts import CrowdsaleContract
from .create_transaction import CreateTransaction
from ico_portal.utils.service_object import ServiceObject, service_call


class BuyTokens(ServiceObject):
    def create_txn_data(self, context):
        txn_data = CrowdsaleContract().buy_tokens(
            mediator_address=context.mediator_address,
            token_address=context.token_address,
            tokens_amount=context.tokens_amount,
            usdc_amount=int(context.usdc_amount)
        )

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return CreateTransaction()(context.txn_data) | \
            (lambda result: self.success(transaction=result.txn))

    @service_call
    def __call__(self, mediator_address, token_address, tokens_amount, usdc_amount):
        return self.success(
            mediator_address=mediator_address,
            token_address=token_address,
            tokens_amount=tokens_amount,
            usdc_amount=usdc_amount
        ) | self.create_txn_data | \
            self.create_transaction
