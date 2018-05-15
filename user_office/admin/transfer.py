from django.contrib import admin

from user_office.models import Transfer
from .inlines import TokensMoveInstanceInline


@admin.register(Transfer)
class TransferAdmin(admin.ModelAdmin):
    search_fields = ('txn_hash',)
    list_display = ('txn_hash', 'amount', 'created_at', 'actualized_at', 'state')
    list_filter = ('state',)

    fields = ('txn_hash', ('account_to', 'account_from'), 'amount', ('block_hash', 'block_number'),
              ('created_at', 'actualized_at'), 'state')
    readonly_fields = ('txn_hash', 'account_to', 'account_from', 'amount', 'block_hash', 'block_number',
                       'created_at', 'actualized_at', 'state')

    inlines = [TokensMoveInstanceInline]
