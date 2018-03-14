from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin

from user_office.models import Phase, Deposit, Mint


admin.site.unregister(Group)

admin.site.register(Phase)
admin.site.register(Deposit)
admin.site.register(Mint)
