from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from user_office.models import Investor
from .inlines import TokensMoveInstanceInline, KYCInstanceInline, SocialAuthInline


@admin.register(Investor)
class InvestorAdmin(UserAdmin):
    fieldsets = (
        (None, {
            'fields': (('email', 'eth_account'), ('first_name', 'last_name'), 'tokens_amount', 'referrer',
                       ('date_joined', 'last_login'), 'password', ('is_active', 'is_staff', 'is_admin'))}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    readonly_fields = ('tokens_amount', 'referrer', 'date_joined', 'last_login')
    list_display = ('email', 'eth_account', 'tokens_amount')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'eth_account')
    ordering = ('email',)
    filter_horizontal = ()

    inlines = [KYCInstanceInline, TokensMoveInstanceInline, SocialAuthInline]
