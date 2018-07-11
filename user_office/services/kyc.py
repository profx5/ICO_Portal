from django.db import DatabaseError

from blockchain.ico.contracts import CrowdsaleContract
from blockchain.ico import services
from ico_portal.utils.service_object import service_call, transactional, ServiceObject


class SaveKYCMixin:
    def save_kyc(self, context):
        try:
            context.kyc.save()

            return self.success()
        except DatabaseError as e:
            return self.fail(e)


class ApproveKYC(ServiceObject, SaveKYCMixin):
    def __init__(self, call_contract=False):
        self.call_contract = call_contract

    def check_state(self, context):
        if context.kyc.state != 'APPROVED':
            return self.success()
        else:
            return self.fail('KYC already approved')

    def set_state(self, context):
        context.kyc.state = 'APPROVED'

        return self.success(kyc=context.kyc)

    def get_txn_data(self, context):
        txn_data = CrowdsaleContract().pass_kyc(context.kyc.investor.eth_account)

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return services.CreateTransaction()(context.txn_data) | \
            (lambda result: self.success(txn=result.txn))

    def set_approve_txn_id(self, context):
        context.kyc.approve_txn_id = context.txn.txn_id

        return self.success(kyc=context.kyc)

    @service_call
    @transactional
    def __call__(self, kyc):
        return self.success(kyc=kyc) | \
            self.check_state | \
            self.set_state | \
            self.get_txn_data | \
            self.create_transaction | \
            self.set_approve_txn_id | \
            self.save_kyc


class DeclineKYC(ServiceObject, SaveKYCMixin):
    @service_call
    def __call__(self, kyc):
        kyc.state = 'DECLINED'

        return self.success(kyc=kyc) | \
            self.save_kyc
