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

SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True

try:
    from .local import *
except ImportError:
    pass
