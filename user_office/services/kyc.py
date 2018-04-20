from oslash import Right, Left
from functools import partial
from django.db import DatabaseError

from blockchain.ico.contracts import CrowdsaleContract


def save_kyc(kyc):
    try:
        kyc.save()

        return Right(kyc)
    except DatabaseError as e:
        return Left('Error while saving kyc {e}')


class ApproveKYC:
    def __init__(self, call_contract=False):
        self.call_contract = call_contract

    def check_state(self, kyc):
        if kyc.state != 'APPROVED':
            return Right(kyc)
        else:
            return Left('KYC already approved')

    def set_state(self, kyc):
        kyc.state = 'APPROVED'

        return Right(kyc)

    def set_approve_txn_hash(self, kyc, txn_hash):
        kyc.approve_txn_hash = txn_hash

        return Right(kyc)

    def contract_pass_kyc(self, kyc):
        if self.call_contract:
            contract = CrowdsaleContract()

            return contract.pass_kyc(kyc.investor.eth_account).bind(partial(self.set_approve_txn_hash, kyc))
        else:
            return Right(kyc)

    def __call__(self, kyc):
        return self.check_state(kyc) | \
            self.set_state | \
            self.contract_pass_kyc | \
            save_kyc


class DeclineKYC:
    def set_state(self, kyc):
        kyc.state = 'DECLINED'

        return Right(kyc)

    def __call__(self, kyc):
        return self.set_state(kyc) | \
            save_kyc
