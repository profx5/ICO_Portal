from oslash import Left, Right
from blockchain.ico.contracts import TokenContract
from .create_transaction import CreateTransaction


class Mint:
    def create_txn_data(self, args):
        txn_data = TokenContract().mint(to=args['to'], amount=args['amount'])

        return Right(dict(args, txn_data=txn_data))

    def create_transaction(self, args):
        return CreateTransaction()(args['txn_data']) | \
            (lambda transaction: Right(dict(args, transaction=transaction)))

    def return_txn_id(self, args):
        return Right(args['transaction'].txn_id)

    def __call__(self, to, amount):
        return Right({'to': to,
                      'amount': amount}) | \
                      self.create_txn_data | \
                      self.create_transaction | \
                      self.return_txn_id
