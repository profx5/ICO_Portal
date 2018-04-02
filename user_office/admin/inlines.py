from django.contrib import admin
from user_office.models import Mint, Deposit, KYC
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


class MintInstanceInline(admin.TabularInline):
    model = Mint
    can_delete = False
    show_change_link = True

    fields = ('txn_hash', 'currency', ('account_to', 'account_from'),
              'value', 'txn_date', 'state')
    readonly_fields = ('txn_hash', 'currency', 'account_to', 'account_from',
                       'value', 'txn_date', 'state')

    def has_add_permission(self, request):
        return False


class DepositInstanceInline(admin.TabularInline):
    model = Deposit
    can_delete = False
    show_change_link = True

    fields = ('state', 'txn_hash', 'amount', 'amount_wo_bonus', 'created_at',
              'charged_at')
    readonly_fields = fields

    def txn_hash(self, obj):
        if obj.mint:
            return obj.mint.txn_hash
        else:
            return ''

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
