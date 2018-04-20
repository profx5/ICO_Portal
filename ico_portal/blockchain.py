import os
from django.conf import settings
from blockchain import init_contracts, init_currencies

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ico_portal.settings.development')

init_contracts()

currencies = init_currencies()
