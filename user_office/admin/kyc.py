from django.contrib import admin
from django_object_actions import DjangoObjectActions

from user_office.models import KYC


@admin.register(KYC)
class KYCAdmin(DjangoObjectActions, admin.ModelAdmin):
    list_display = ('investor', 'state', 'firstname', 'midname', 'surname')
    list_filter = ('state',)
    readonly_fields = ('state',)

    change_actions = ('approve_kyc', 'decline_kyc')

    def approve_kyc(self, request, kyc):
        kyc.approve()
        kyc.save()
    approve_kyc.label = "Approve"
    approve_kyc.short_description = "Approve KYC"

    def decline_kyc(self, request, kyc):
        kyc.decline()
        kyc.save()
    decline_kyc.label = "Decline"
    decline_kyc.short_description = "Decline KYC"

    def get_change_actions(self, request, object_id, form_url):
        actions = super().get_change_actions(request, object_id, form_url)
        actions = list(actions)

        obj = self.model.objects.get(pk=object_id)
        if obj.waiting:
            return actions
        else:
            return []
