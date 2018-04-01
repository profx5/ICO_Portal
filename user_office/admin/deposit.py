from django.contrib import admin

from user_office.models import Deposit
from .inlines import MintInstanceInline


@admin.register(Deposit)
class DepositAdmin(admin.ModelAdmin):
    search_fields = ('mint__txn_hash', 'investor__username',
                     'investor__eth_account')
    list_display = ('state', 'investor', 'txn_hash', 'amount', 'amount_wo_bonus',
                    'created_at', 'charged_at')
    list_filter = ('state',)

    fields= ('investor', 'txn_hash', 'state', ('amount', 'amount_wo_bonus'),
             ('created_at', 'charged_at'), 'mint')
    readonly_fields = ('investor', 'txn_hash', 'state', 'amount', 'amount_wo_bonus',
                       'created_at', 'charged_at')

    def txn_hash(self, obj):
        if obj.mint:
            return obj.mint.txn_hash
        else:
            return ''

    def save_model(self, request, obj, form, change):
        investor = obj.investor

        obj.save()

        investor.recalc_balance()
        investor.save()

    def delete_model(self, request, obj):
        investor = obj.investor

        obj.delete()

        investor.recalc_balance()
        investor.save()
