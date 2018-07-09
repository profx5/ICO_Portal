from .development import *

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

RECAPTCHA_DATA_SITEKEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
RECAPTCHA_SECRET = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'

WEB3_RPC_URL = 'https://rinkeby.infura.io/froCrQaR0EB1JP83hAjj'

CURRENCIES = {
    'ethereum': {
        'module': 'ethereum',
        'code': 'ETH',
        'name': 'Ethereum',
        'rpc_url': WEB3_RPC_URL,
    },
    'litecoin': {
        'module': 'coinpayments',
        'code': 'LTC',
        'name': 'Litecoin',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_secret': 'q123q123q123',
        'public_key': '3eaf230a98bd62a69305f1d06ca50f69095be5d23bef32c06b328eb0f134129f',
        'private_key': '87cbfc69BAB5fbdC910e9080b363d63352fc4fAdcDad46280b80767537849e24'
    }
}

EXCHANGE_RATES = ['ETH', 'LTC']
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

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
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
        'evm': {
            'handlers': [],
            'propagate': False
        },
        'web3': {
            'handlers': [],
            'propagate': False
        }
    }
}
