from oslash import Left, Right, Nothing
from django.db import DatabaseError
from web3 import Web3

from blockchain.ico.contracts import CrowdsaleContract
from user_office.models import Payment


class ProcessPurchase:
    def create_payment(self, args):
        payment = Payment(currency='ETH',
                          payer_account=args['event'].investor,
                          amount=Web3.fromWei(args['event'].wei_amount, 'ether'),
                          amounti=args['event'].wei_amount,
                          txn_id=args['event'].txn_hash,
                          tokens_move=args['tokens_move'])

        try:
            payment.save()
        except DatabaseError as e:
            return Left(f'Error while saving payment {e}')

        return Right(dict(args, payment=payment))

    def return_payment(self, args):
        return Right(args['payment'])

    def __call__(self, tokens_move):
        txn_hash = tokens_move.transfer.txn_hash

        event = CrowdsaleContract().get_event_from_txn_hash(txn_hash)

        if isinstance(event, Nothing):
            return Right(None)
        else:
            return Right({'tokens_move': tokens_move,
                          'event': event.value}) | \
                          self.create_payment | \
                          self.return_payment
