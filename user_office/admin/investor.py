from django.contrib import admin

from user_office.models import Investor


@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = ('username', 'eth_account', 'tokens_amount')
    exclude = ('password',)
