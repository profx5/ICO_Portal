from .base import *

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        'CACHE': True
    }
}

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': os.environ['DB_HOST'],
        'OPTIONS': {
            'isolation_level': 'read committed'
        }
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, "assets")
MEDIA_ROOT = '/media_data/'

WEB3_RPC_URL = os.environ['WEB3_RPC_URL']
CELERY_BROKER_URL = os.environ['CELERY_BROKER_URL']

try:
    from .local import *
except ImportError:
    pass
