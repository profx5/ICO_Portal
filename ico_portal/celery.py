import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ico_portal.settings.development')

app = Celery('ico_portal')

app.config_from_object('django.conf:settings', namespace='CELERY')
