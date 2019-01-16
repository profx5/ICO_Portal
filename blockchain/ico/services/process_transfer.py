from django.db import DatabaseError

from blockchain.currencies.ethereum.services import process_purchase
from user_office.models import Transfer, Transaction
from user_office.services import AddReferralBonus
from .process_tokens_moves import ProcessIncomingTokensMove, \
    ProcessOutgoingTokensMove
from ico_portal.utils.service_object import ServiceObject, service_call, transactional
from blockchain.ico.contracts import CrowdsaleContract


class ProcessTransfer(ServiceObject):
    def check_event(self, context):
        if context.event.removed:
            return self.fail('Transfer event has removed=True')
        else:
            return self.success()

    def find_existing_transfer(self, context):
        transfer = Transfer.objects.filter(txn_hash=context.event.txn_hash).first()

        if transfer:
            return self.success(transfer=transfer)
        else:
            transaction = Transaction.objects.filter(txn_hash=context.event.txn_hash).first()

            if transaction:
                transfer = Transfer.objects.filter(buy_txn_id=transaction.txn_id).first()

                if transfer:
                    return self.success(transfer=transfer)

            return self.success(transfer=None)

    def get_transfer(self, context):
        event = context.event

        fields = {
            'txn_hash': event.txn_hash,
            'from_account': event.from_account,
            'to_account': event.to_account,
            'amount': event.amount,
            'block_hash': event.block_hash,
            'block_number': event.block_number,
            'created_at': event.accepted_at,
        }

        transfer = context.transfer

        if transfer:
            if transfer.actual:
                return self.fail(f'Found Transfer with id={transfer.id} is already actual')

            for k, v in fields.items():
                setattr(transfer, k, v)
        else:
            transfer = Transfer(**fields)

        transfer.actualize()

        try:
            transfer.save()

            return self.success(transfer=transfer)
        except DatabaseError as e:
            return self.fail(e)

    def process_incoming_tokens_move(self, context):
        return ProcessIncomingTokensMove()(context.transfer) | (
            lambda result: self.success(incoming_TM=result.tokens_move)
        )

    def process_outgoing_tokens_move(self, context):
        return ProcessOutgoingTokensMove()(context.transfer) | (
            lambda result: self.success(outgoing_TM=result.tokens_move)
        )

    def create_referral_bonus(self, context):
        if 'payment' in context:
            return AddReferralBonus()(payment=context.payment) | (lambda result: self.success())

        return self.success()

    @service_call
    @transactional
    def __call__(self, event):
        return self.success(event=event) | \
            self.check_event | \
            self.find_existing_transfer | \
            self.get_transfer | \
            self.process_incoming_tokens_move | \
            self.process_outgoing_tokens_move | \
            self.create_referral_bonus
