import os
from celery import Celery

from raven.contrib.celery import register_logger_signal, register_signal
from raven.contrib.django.raven_compat.models import client

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ico_portal.settings.development')

app = Celery('ico_portal')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

register_logger_signal(client)
register_signal(client)
