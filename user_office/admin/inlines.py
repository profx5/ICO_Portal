from django.contrib import admin
from user_office.models import TokensMove, Transfer, KYC, Payment
from social_django.models import UserSocialAuth

class KYCInstanceInline(admin.TabularInline):
    model = KYC
    verbose_name = 'KYC'
    verbose_name_plural = 'KYC'
    can_delete = False
    show_change_link = True
    extra = 0

    fields = ('state', 'firstname', 'midname', 'surname', 'photo', 'selfie')
    readonly_fields = fields


class TransferInstanceInline(admin.TabularInline):
    model = Transfer
    can_delete = False
    show_change_link = True

    fields = ('txn_hash', ('account_to', 'account_from'), 'amount', ('block_hash', 'block_number'),
              ('created_at', 'actualized_at'), 'state')
    readonly_fields = ('txn_hash', 'account_to', 'account_from', 'amount', 'block_hash', 'block_number',
                       'created_at', 'actualized_at', 'state')

    def has_add_permission(self, request):
        return False


class TokensMoveInstanceInline(admin.TabularInline):
    model = TokensMove
    can_delete = False
    show_change_link = True

    fields = ('state', 'txn_hash', 'amount', 'created_at', 'actualized_at')
    readonly_fields = fields

    def txn_hash(self, obj):
        return obj.transfer.txn_hash

    def has_add_permission(self, request):
        return False


class SocialAuthInline(admin.TabularInline):
    model = UserSocialAuth

    verbose_name = 'Social auth'
    verbose_name_plural = 'Social auth'
    can_delete = False
    show_change_link = True
    extra = 0

    readonly_fields = ('user', 'provider', 'uid', 'extra_data')

    def has_add_permission(self, request):
        return False


class PaymentInstanceInline(admin.TabularInline):
    model = Payment
    can_delete = False
    show_change_link = True

    fields = ('currency', 'payer_account', 'received_at', 'txn_id')
    readonly_fields = fields

    def has_add_permission(self, request):
        return False
