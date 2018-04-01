from django.contrib.auth.models import Group

from .investor import *
from .kyc import *
from .mint import *
from .deposit import *

admin.site.unregister(Group)
