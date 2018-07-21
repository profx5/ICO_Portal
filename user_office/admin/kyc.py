from oslash import Left
from django.contrib import admin
from django_object_actions import DjangoObjectActions

from user_office.models import KYC
from blockchain.ico.services import ApproveKYC


@admin.register(KYC)
class KYCAdmin(DjangoObjectActions, admin.ModelAdmin):
    list_display = ('investor', 'state', 'type')
    list_filter = ('state', 'type')

    change_actions = ['approve_kyc', 'decline_kyc']

    fieldsets = (
        (None, {
            'fields': ('investor', 'state', 'type', 'id_document_photo', 'bill_photo')
        }),
        ('Natural Person', {
            'fields': (('firstname', 'lastname'), ('place_of_birth', 'birthdate'), 'personal_id',
                       ('phone_number', 'email'), 'place_of_residence', 'profession'),
            'classes': ('collapse', ),
        }),
        ('Legal Person', {
            'fields': ('business_name', ('registration_number', 'registration_date'), 'phone_number',
                       ('director_firstname', 'director_lastname'), 'basis_doc', 'email', 'address', 'field_of_activity',
                       ('beneficial_fullname', 'beneficial_personal_id'), ('beneficial_place_of_birth', 'beneficial_birthdate'),
                       'beneficial_place_of_residence', 'is_pep'),
            'classes': ('collapse', ),
        })
    )

    def get_exclude(self, request, obj=None):
        if obj:
            if obj.state in ('WAITING', 'DECLINED'):
                return ('approve_txn_id',)
            else:
                return ('decline_reason',)

    def get_readonly_fields(self, request, obj=None):
        fields = ['state']

        if obj:
            if obj.state == 'APPROVED':
                fields.append('approve_txn_id')

        return fields

    def approve_kyc(self, request, kyc):
        result = ApproveKYC()(kyc)

        if isinstance(result, Left):
            raise Exception(result.value)

    approve_kyc.label = "Approve"
    approve_kyc.short_description = "Approve KYC"

    def decline_kyc(self, request, kyc):
        kyc.state = 'DECLINED'
        kyc.save()

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
