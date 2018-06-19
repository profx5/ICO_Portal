from oslash import Left, Right
from django.db import DatabaseError

from user_office.models import Transfer, TokensMove, Transaction


class PrepareTokensMove:
    def create_transfer(self, args):
        transfer = Transfer(txn_hash=args['txn_hash'],
                            mint_txn_id=args['mint_txn_id'],
                            state='PREPARED')

        try:
            transfer.save()

            return Right(dict(args, transfer=transfer))
        except DatabaseError as e:
            return Left(f'Error while saving prepared Transfer {e}')

    def create_tokens_move(self, args):
        tokens_move = TokensMove(investor=args['investor'],
                                 amount=args['amount'],
                                 transfer=args['transfer'],
                                 state='PREPARED',
                                 direction='IN')

        try:
            tokens_move.save()

            return Right(dict(args, tokens_move=tokens_move))
        except DatabaseError as e:
            return Left(f'Error while saving prepared TokensMove {e}')

    def __call__(self, investor, currency, amount, txn_hash=None, mint_txn_id=None):
        return Right({'investor': investor,
                      'txn_hash': txn_hash,
                      'mint_txn_id': mint_txn_id,
                      'currency': currency,
                      'amount': amount}) | \
                      self.create_transfer | \
                      self.create_tokens_move
