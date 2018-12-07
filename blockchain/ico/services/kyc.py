from django.db import DatabaseError
from django.conf import settings
from django.urls import reverse
from user_office.tasks import send_mail

from ico_portal.utils.service_object import service_call, transactional, ServiceObject
from user_office.models import KYC


class ApproveKYC(ServiceObject):
    def check_state(self, context):
        if context.kyc.state != 'APPROVED':
            return self.success()
        else:
            return self.fail('KYC already approved')

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
            self.mark_as_approved | \
            self.send_mail | \
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
