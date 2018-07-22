from django.db import DatabaseError

from user_office.models import Transfer, TokensMove
from ico_portal.utils.service_object import ServiceObject, service_call


class PrepareTokensMove(ServiceObject):
    def create_transfer(self, context):
        transfer = Transfer(txn_hash=context.txn_hash,
                            buy_txn_id=context.buy_txn_id,
                            state='PREPARED')

        try:
            transfer.save()

            return self.success(transfer=transfer)
        except DatabaseError as e:
            return self.fail(e)

    def create_tokens_move(self, context):
        tokens_move = TokensMove(investor=context.investor,
                                 amount=context.amount,
                                 transfer=context.transfer,
                                 state='PREPARED',
                                 direction='IN')

        try:
            tokens_move.save()

            return self.success(tokens_move=tokens_move)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, investor, currency, amount=None, txn_hash=None, buy_txn_id=None):
        return self.success(investor=investor, txn_hash=txn_hash, buy_txn_id=buy_txn_id,
                            currency=currency, amount=amount) | \
                            self.create_transfer | \
                            self.create_tokens_move
