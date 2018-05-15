from django.contrib.auth.models import Group

from .investor import *
from .kyc import *
from .exchange_rates import *
from .transfer import *
from .tokens_move import *
from .payment import *

admin.site.unregister(Group)


#####################################################################

from user_office.models import Phase
from django.contrib import admin


@admin.register(Phase)
class PhaseAdmin(admin.ModelAdmin):
    pass
