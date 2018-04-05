from .base import *

MEDIA_ROOT = '/tmp/ico_portal_test_media/'

INSTALLED_APPS += ('behave_django',)

DEBUG = True
STATICFILES_DIRS.append(os.path.join(BASE_DIR, "assets"))

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}
