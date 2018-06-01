from oslash import Left, Right
from django.db import DatabaseError

from user_office.models import Transaction


class CreateTransaction:
    def build_object(self, args):
        txn = Transaction(data=args['data'],
                          value=args['value'],
                          to_account=args['to'],
                          gas=args['gas'],
                          state='PREPARED')

        return Right(dict(args, txn=txn))

    def save_object(self, args):
        try:
            args['txn'].save()

            return Right(args)
        except DatabaseError as e:
            return Left(f'Error while saving Transaction, {e}')

    def return_txn(self, args):
        return Right(args['txn'])

    def __call__(self, transaction_data):
        return Right(transaction_data) | \
            self.build_object | \
            self.save_object | \
            self.return_txn
