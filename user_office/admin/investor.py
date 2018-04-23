from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm

from user_office.models import Investor, KYC
from .mixins import PasswordFieldMixin
from .inlines import TokensMoveInstanceInline, KYCInstanceInline, SocialAuthInline


class InvestorChangeForm(UserChangeForm):
    class Meta:
        model = Investor
        fields = '__all__'


@admin.register(Investor)
class InvestorAdmin(PasswordFieldMixin, admin.ModelAdmin):
    form = InvestorChangeForm

    list_display = ('email', 'eth_account', 'tokens_amount')
    fields = (('email', 'eth_account'), 'tokens_amount',
              ('date_joined', 'last_login'), 'password')
    readonly_fields = ('email', 'tokens_amount', 'date_joined', 'last_login')
    search_fields = ('email', 'eth_account')

    inlines = [KYCInstanceInline, TokensMoveInstanceInline, SocialAuthInline]
