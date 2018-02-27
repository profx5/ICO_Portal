from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin

from .models import Investor, Phase, Deposit, Mint


class InvestorAdmin(admin.ModelAdmin):
    list_display = ('username', 'eth_account', 'tokens_amount',)
    exclude = ('password',)

    class Meta:
        model = Investor


admin.site.unregister(Group)

admin.site.register(Investor, InvestorAdmin)
admin.site.register(Phase)
admin.site.register(Deposit)
admin.site.register(Mint)
