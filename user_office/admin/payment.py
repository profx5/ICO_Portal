from django.contrib import admin

from user_office.models import Payment


@admin.register(Payment)
class TransferAdmin(admin.ModelAdmin):
    search_fields = ('external_id',)
    list_display = ('currency', 'external_id', 'payer_account', 'received_at', 'txn_id')
    list_filter = ('currency',)

    fields = ('currency', 'payer_account', 'amount', 'amounti', 'external_id',
              'txn_id', 'received_at', 'tokens_move')
    readonly_fields = ('currency', 'payer_account', 'amount', 'amounti', 'external_id',
                       'txn_id', 'received_at')
