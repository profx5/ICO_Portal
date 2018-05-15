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

REDAPTCHA_DATA_SITEKEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
RECAPTCHA_SECRET = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'

WEB3_RPC_URL = 'https://rinkeby.infura.io/froCrQaR0EB1JP83hAjj'
