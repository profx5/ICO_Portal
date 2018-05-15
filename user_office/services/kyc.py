from oslash import Right, Left
from functools import partial
from django.db import DatabaseError

from blockchain.ico.contracts import CrowdsaleContract


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
            return Right(argsx)
        else:
            return Left('KYC already approved')

    def set_state(self, args):
        args['kyc'].state = 'APPROVED'

        return Right(kyc)

    def send_pass_kyc(self, args):
        if self.call_contract:
            contract = CrowdsaleContract()

            transaction = contract.pass_kyc(args['kyc'].investor.eth_account)

            txn_hash = transaction.send()

            return Right(dict(args, txn_hash=txn_hash))
        else:
            return Right(args)

    def set_approve_txn_hash(self, args):
        if args['txn_hash']:
            args['kyc'].approve_txn_hash = txn_hash

        return Right(args)

    def __call__(self, kyc):
        return Right({'kyc': kyc}) | \
            self.check_state | \
            self.set_state | \
            self.send_pass_kyc | \
            self.set_approve_txn_hash | \
            save_kyc


class DeclineKYC:
    def set_state(self, args):
        args['kyc'].state = 'DECLINED'

        return Right(args)

    def __call__(self, kyc):
        return Right({'kyc': kyc}) | \
            self.set_state | \
            save_kyc
