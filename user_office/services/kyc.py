from oslash import Right, Left
from functools import partial
from django.db import DatabaseError, transaction

from blockchain.ico.contracts import CrowdsaleContract
from blockchain.ico import services


def save_kyc(args):
    try:
        args['kyc'].save()

        return Right(args)
    except DatabaseError as e:
        return Left('Error while saving kyc {e}')


class ApproveKYC:
    def __init__(self, call_contract=False):
        self.call_contract = call_contract

    def check_state(self, args):
        if args['kyc'].state != 'APPROVED':
            return Right(args)
        else:
            return Left('KYC already approved')

    def set_state(self, args):
        args['kyc'].state = 'APPROVED'

        return Right(args)

    def get_txn_data(self, args):
        txn_data = CrowdsaleContract().pass_kyc(args['kyc'].investor.eth_account)

        return Right(dict(args, txn_data=txn_data))

    def create_transaction(self, args):
        return services.CreateTransaction()(args['txn_data']) | \
            (lambda transaction: Right(dict(args, txn=transaction)))

    def set_approve_txn_id(self, args):
        args['kyc'].approve_txn_id = args['txn'].txn_id

        return Right(args)

    def __call__(self, kyc):
        with transaction.atomic():
            result = Right({'kyc': kyc}) | \
                     self.check_state | \
                     self.set_state | \
                     self.get_txn_data | \
                     self.create_transaction | \
                     self.set_approve_txn_id | \
                     save_kyc

            if isinstance(result, Left):
                transaction.set_rollback(True)

            return result


class DeclineKYC:
    def set_state(self, args):
        args['kyc'].state = 'DECLINED'

        return Right(args)

    def __call__(self, kyc):
        return Right({'kyc': kyc}) | \
            self.set_state | \
            save_kyc
