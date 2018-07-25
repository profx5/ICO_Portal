import re
from .base import *

DEBUG = True

SECRET_KEY = 'e%1h03sc5xmbr#q^r2l7h78-^1vuwapt8%eiumxyr@^91v61v^'

ALLOWED_HOSTS = ['*']

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

RAVEN_CONFIG = {
    'dsn': 'https://98e586745597476dafda3ea15296e38f:1495fcec1c6d4d55afeeed1dce5f05bd@sentry.io/1236224',
    'sample_rate': 0
}

IGNORABLE_404_URLS = (
    re.compile('/sockjs-node'),
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.dev.json'),
    }
}

MEDIA_ROOT = '/tmp/ico_portal_media/'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ico_portal',
        'USER': 'ico_portal_user',
        'PASSWORD': 'read_manual',
        'HOST': 'localhost',
        'OPTIONS': {
            'isolation_level': 'read committed'
        }
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

SIGNUP_CLOSED = False

try:
    from .local import *
except ImportError:
    pass
