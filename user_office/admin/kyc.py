from oslash import Left
from django.contrib import admin
from django_object_actions import DjangoObjectActions

from user_office.models import KYC
from blockchain.ico.services import ApproveKYC, DeclineKYC
from .inlines import KYCAttachmentsInline


@admin.register(KYC)
class KYCAdmin(DjangoObjectActions, admin.ModelAdmin):
    list_display = ('investor', 'state', 'type')
    list_filter = ('state', 'type')

    change_actions = ['approve_kyc', 'decline_kyc', 'to_waiting']

    inlines = [KYCAttachmentsInline]

    fieldsets = (
        (None, {
            'fields': ('investor', 'state', 'type', 'ticket')
        }),
        ('Natural Person', {
            'fields': (('firstname', 'lastname'), ('place_of_birth', 'birthdate'), 'personal_id',
                       ('phone_number', 'email'), 'place_of_residence', 'profession'),
            'classes': ('collapse', ),
        }),
        ('Legal Person', {
            'fields': ('business_name', ('registration_number', 'registration_date'), 'phone_number',
                       ('director_firstname', 'director_lastname'), 'email', 'address', 'field_of_activity',
                       ('beneficial_fullname', 'beneficial_personal_id'), ('beneficial_place_of_birth', 'beneficial_birthdate'),
                       'beneficial_place_of_residence', 'is_pep'),
            'classes': ('collapse', ),
        })
    )

    def get_exclude(self, request, obj=None):
        if obj:
            if obj.state != 'APPROVED':
                return ('decline_reason',)

    def get_readonly_fields(self, request, obj=None):
        return ['state']

    def approve_kyc(self, request, kyc):
        result = ApproveKYC()(kyc)

        if isinstance(result, Left):
            raise Exception(result.value)

    approve_kyc.label = "Approve"
    approve_kyc.short_description = "Approve KYC"

    def decline_kyc(self, request, kyc):
        result = DeclineKYC()(kyc)

        if isinstance(result, Left):
            raise Exception(result.value)

    decline_kyc.label = "Decline"
    decline_kyc.short_description = "Decline KYC"

    def to_waiting(self, rquest, kyc):
        kyc.state = "WAITING"

        kyc.save()

    to_waiting.label = "Waiting approval"
    to_waiting.short_description = "Waiting approval"

    def get_change_actions(self, request, object_id, form_url):
        actions = []

        obj = self.model.objects.get(pk=object_id)

        if obj.waiting:
            actions.append('decline_kyc')

            if obj.investor.eth_account != '' and not obj.mining:
                actions.append('approve_kyc')

        if obj.declined:
            actions.append('to_waiting')

        return actions
