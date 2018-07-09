import re
from .base import *

DEBUG = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'simple': {
            'format': '%(levelname)s [%(asctime)s] %(name)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'sentry': {
            'level': 'ERROR',
            'class': 'raven.contrib.django.handlers.SentryHandler',
            'dsn': 'https://98e586745597476dafda3ea15296e38f:1495fcec1c6d4d55afeeed1dce5f05bd@sentry.io/1236224',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console', 'sentry'],
            'level': 'INFO',
            'propagate': False,
        },
        'celery': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'django': {
            'handlers': ['console'],
        },
    }
}

RAVEN_CONFIG['sample_rate'] = 0

IGNORABLE_404_URLS = (
    re.compile('/sockjs-node'),
)

try:
    from .local import *
except ImportError:
    pass
