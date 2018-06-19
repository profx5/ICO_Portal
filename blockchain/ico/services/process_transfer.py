from oslash import Left, Right, Nothing
from django.db import transaction, DatabaseError

from blockchain.currencies.ethereum.services import process_purchase
from user_office.models import Transfer, Transaction
from .process_tokens_moves import ProcessIncomingTokensMove, \
    ProcessOutgoingTokensMove


class ProcessTransfer:
    def check_event(self, args):
        if args['event'].removed:
            return Left('Transfer event has removed=True')
        else:
            return Right(args)

    def find_transaction(self, args):
        txn_hash = args['event'].txn_hash
        transaction = Transaction.objects.filter(txn_hash=txn_hash)

        if transaction.exists():
            return Right(dict(args, transaction=transaction.first()))
        else:
            return Right(dict(args, transaction=None))

    def get_transfer(self, args):
        event = args['event']

        fields = {
            'txn_hash': event.txn_hash,
            'from_account': event.from_account,
            'to_account': event.to_account,
            'amount': event.amount,
            'block_hash': event.block_hash,
            'block_number': event.block_number,
            'created_at': event.accepted_at,
        }

        transaction = args['transaction']

        if transaction:
            transfer = Transfer.objects.filter(mint_txn_id=transaction.txn_id).first()
        else:
            transfer = Transfer.objects.filter(txn_hash=fields['txn_hash']).first()

        if transfer:
            if transfer.actual:
                return Left(f'Found Transfer with id={transfer.id} is already actual')

            for k, v in fields.items():
                setattr(transfer, k, v)
        else:
            transfer = Transfer(**fields)

        transfer.actualize()

        try:
            transfer.save()
        except DatabaseError as e:
            return Left(f'Error while saving transfer {e}')

        return Right(dict(args, transfer=transfer))

    def process_incoming_tokens_move(self, args):
        incoming_TM = ProcessIncomingTokensMove()(args['transfer'])

        if isinstance(incoming_TM, Nothing):
            return Right(dict(args, incoming_TM=None))
        else:
            return incoming_TM | (lambda result: Right(dict(args, incoming_TM=result['tokens_move'])))

    def process_outgoing_tokens_move(self, args):
        if args['event'].is_purchase:
            return Right(dict(args, outgoing_TM=None))
        else:
            outgoing_TM = ProcessOutgoingTokensMove()(args['transfer'])

            if isinstance(outgoing_TM, Nothing):
                return Right(dict(args, outgoing_TM=None))
            else:
                return outgoing_TM | (lambda tokens_move: Right(dict(args, outgoing_TM=tokens_move)))

    def maybe_process_purchase(self, args):
        if args['event'].is_purchase and args['incoming_TM']:
            return process_purchase.ProcessPurchase()(args['incoming_TM']) | \
                (lambda payment: Right(dict(args, payment=payment)))
        else:
            return Right(args)

    def __call__(self, event):
        with transaction.atomic():
            result = Right({'event': event}) | \
                     self.check_event | \
                     self.find_transaction | \
                     self.get_transfer | \
                     self.process_incoming_tokens_move | \
                     self.process_outgoing_tokens_move | \
                     self.maybe_process_purchase

            if isinstance(result, Left):
                transaction.set_rollback(True)

            return result
