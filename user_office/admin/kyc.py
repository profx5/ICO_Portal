from oslash import Right, Left
from django.contrib import admin
from django_object_actions import DjangoObjectActions

from user_office.models import KYC
from user_office.services import ApproveKYC, DeclineKYC


@admin.register(KYC)
class KYCAdmin(DjangoObjectActions, admin.ModelAdmin):
    list_display = ('investor', 'state', 'firstname', 'midname', 'surname')
    list_filter = ('state',)

    change_actions = ['approve_kyc', 'decline_kyc']

    def get_exclude(self, request, obj=None):
        if obj:
            if obj.state in ('WAITING', 'DECLINED'):
                return ('approve_txn_id',)
            else:
                return ('decline_reason',)

    def get_readonly_fields(self, request, obj=None):
        fields = ['state',]

        if obj:
            if obj.state == 'APPROVED':
                fields.append('approve_txn_id')

        return fields

    def approve_kyc(self, request, kyc):
        service = ApproveKYC(call_contract=True)

        result = service(kyc)

        if isinstance(result, Left):
            raise Exception(result.value)

    approve_kyc.label = "Approve"
    approve_kyc.short_description = "Approve KYC"

    def decline_kyc(self, request, kyc):
        service = DeclineKYC()
        result = service(kyc)

        if isinstance(result, Left):
            raise Exception(result.value)

    decline_kyc.label = "Decline"
    decline_kyc.short_description = "Decline KYC"

    def get_change_actions(self, request, object_id, form_url):
        actions = []

        obj = self.model.objects.get(pk=object_id)

        if obj.waiting:
            actions.append('decline_kyc')

            if obj.investor.eth_account != '':
                actions.append('approve_kyc')

        return actions
