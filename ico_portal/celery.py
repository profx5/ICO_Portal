import os
from celery import Celery
from .currencies import currencies

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ico_portal.settings')

app = Celery('ico_portal')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks(currencies.modules())
