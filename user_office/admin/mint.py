from django.contrib import admin

from user_office.models import Mint
from .inlines import DepositInstanceInline


@admin.register(Mint)
class MintAdmin(admin.ModelAdmin):
    list_display = ('txn_hash', 'currency', 'account_to', 'account_from',
                    'value', 'txn_date')
    fields = ('txn_hash', 'currency', ('account_to', 'account_from'),
              'value', 'txn_date', 'state')
    readonly_fields = ('txn_hash', 'currency', 'account_to', 'account_from',
                       'value', 'txn_date', 'state')

    inlines = [DepositInstanceInline]
