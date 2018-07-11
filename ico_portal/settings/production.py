from .base import *

STATICFILES_DIRS.append(os.path.join(BASE_DIR, "assets"))

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        'CACHE': True
    }
}
DEBUG = False
