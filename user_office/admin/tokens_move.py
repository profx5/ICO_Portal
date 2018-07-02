from django.contrib import admin

from user_office.models import TokensMove
from .inlines import PaymentInstanceInline


@admin.register(TokensMove)
class TokeneMoveAdmin(admin.ModelAdmin):
    search_fields = ('transfer__txn_hash', 'investor__username',
                     'investor__eth_account')
    list_display = ('state', 'investor', 'amount', 'created_at', 'actualized_at', 'txn_hash')
    list_filter = ('state',)

    fields = ('investor', 'state', 'amount', ('created_at', 'actualized_at'), 'txn_hash', 'transfer')
    readonly_fields = ('state', 'amount', 'created_at', 'actualized_at', 'txn_hash')

    inlines = [PaymentInstanceInline]

    def txn_hash(self, obj):
        return obj.transfer.txn_hash
