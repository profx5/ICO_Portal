from django.contrib import admin
from user_office.models import ExchangeRate


class ExchangeRateAdmin(admin.ModelAdmin):
    list_display = [f.name for f in ExchangeRate._meta.fields]


admin.site.register(ExchangeRate, ExchangeRateAdmin)
