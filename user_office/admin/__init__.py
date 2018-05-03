from django.contrib.auth.models import Group

from .investor import *
from .kyc import *
from .mint import *
from .deposit import *
from .exchange_rates import *

admin.site.unregister(Group)


#####################################################################

from user_office.models import Phase
from django.contrib import admin


@admin.register(Phase)
class PhaseAdmin(admin.ModelAdmin):
    pass
