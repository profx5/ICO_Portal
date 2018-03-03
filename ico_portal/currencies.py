import os
from django.conf import settings
from blockchain.currencies import Currencies

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ico_portal.settings')

currencies = Currencies
currencies.init(settings.CURRENCIES)
