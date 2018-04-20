import os
from celery import Celery
from .blockchain import currencies

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ico_portal.settings.development')

app = Celery('ico_portal')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(currencies.modules() + ['blockchain.ico'])
