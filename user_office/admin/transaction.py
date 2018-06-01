from django.contrib import admin

from user_office.models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    search_fields = ('txn_id', 'nonce', 'to_account')
    list_display = ('txn_id', 'txn_hash', 'state', 'nonce', 'from_account', 'to_account', 'gas',
                    'gas_price', 'block_number')
    list_filter = ('state',)

    fields = ('txn_id', 'state', ('from_account', 'to_account'), ('gas', 'gas_price'), 'txn_hash',
              'block_number', 'created_at')
    readonly_fields = ('txn_id', 'from_account', 'to_account', 'gas', 'txn_hash',
                       'block_number', 'created_at')
