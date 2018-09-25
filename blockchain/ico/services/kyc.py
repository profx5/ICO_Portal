from django.db import DatabaseError
from django.conf import settings
from django.urls import reverse
from user_office.tasks import send_mail

from blockchain.ico.contracts import CrowdsaleContract
from blockchain.ico import services
from ico_portal.utils.service_object import service_call, transactional, ServiceObject
from user_office.models import KYC


class ApproveKYC(ServiceObject):
    def check_state(self, context):
        if context.kyc.state != 'APPROVED':
            return self.success()
        else:
            return self.fail('KYC already approved')

    def get_txn_data(self, context):
        txn_data = CrowdsaleContract().pass_kyc(context.kyc.investor.eth_account)

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return services.CreateTransaction()(context.txn_data, "PASS_KYC") | \
            (lambda result: self.success(txn=result.txn))

    def set_approve_txn_id(self, context):
        context.kyc.approve_txn_id = context.txn.txn_id

        return self.success(kyc=context.kyc)

    def set_state(self, context):
        context.kyc.state = 'MINING'

        return self.success(kyc=context.kyc)

    def save_kyc(self, context):
        try:
            context.kyc.save()

            return self.success()
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    @transactional
    def __call__(self, kyc):
        return self.success(kyc=kyc) | \
            self.check_state | \
            self.get_txn_data | \
            self.create_transaction | \
            self.set_approve_txn_id | \
            self.set_state | \
            self.save_kyc


class DeclineKYC(ServiceObject):
    def check_state(self, context):
        if context.kyc.state != 'DECLINED':
            return self.success()
        else:
            return self.fail('KYC already declined')

    def set_state(self, context):
        context.kyc.state = 'DECLINED'

        return self.success(kyc=context.kyc)

    def save_kyc(self, context):
        try:
            context.kyc.save()

            return self.success()
        except DatabaseError as e:
            return self.fail(e)

    def send_mail(self, context):
        support_url = "%s%ssupport/" % (settings.HOST, reverse('user_office'))
        email = context.kyc.investor.email

        ctx = {
            'support_url': support_url,
            'email': email
        }

        send_mail.delay('Your KYC request was declined', email, 'mail/kyc_declined.html', ctx)

        return self.success()

    @service_call
    @transactional
    def __call__(self, kyc):
        return self.success(kyc=kyc) | \
            self.check_state | \
            self.set_state | \
            self.save_kyc | \
            self.send_mail


class ApproveMinedKYC(ServiceObject):
    def check_txn_mined(self, context):
        if context.txn_object.state == 'MINED':
            return self.success()
        else:
            return self.fail('Transaction is not mined')

    def check_txn_type(self, context):
        if context.txn_object.txn_type == 'PASS_KYC':
            return self.success()
        else:
            return self.fail('Transaction type is not pass_kyc')

    def get_kyc(self, context):
        try:
            kyc = KYC.objects.get(approve_txn_id=context.txn_object.txn_id)

            return self.success(kyc=kyc)
        except KYC.DoesNotExist:
            return self.fail('KYC object does not exist')
        except DatabaseError as e:
            return self.fail(e)

    def mark_as_approved(self, context):
        context.kyc.state = 'APPROVED'

        try:
            context.kyc.save()

            return self.success()
        except DatabaseError as e:
            return self.fail(e)

    def send_mail(self, context):
        payment_url = "%s%spayment/" % (settings.HOST, reverse('user_office'))
        email = context.kyc.investor.email

        ctx = {
            'payment_url': payment_url,
            'email': email
        }

        send_mail.delay('Your KYC request was approved', email, 'mail/kyc_approved.html', ctx)

        return self.success()

    @service_call
    @transactional
    def __call__(self, txn_object):
        return self.success(txn_object=txn_object) | \
            self.check_txn_mined | \
            self.check_txn_type | \
            self.get_kyc | \
            self.mark_as_approved | \
            self.send_mail
