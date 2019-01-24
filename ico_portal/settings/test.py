from .development import *

MEDIA_ROOT = '/tmp/ico_portal_test_media/'

INSTALLED_APPS += ('behave_django',)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
    }
}

RECAPTCHA_DATA_SITEKEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
RECAPTCHA_SECRET = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'

WEB3_RPC_URL = 'https://rinkeby.infura.io/froCrQaR0EB1JP83hAjj'

CROWDSALE_CONTRACT = {
    'address': '0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',
}
TOKEN_CONTRACT = {
    'address': '0xDf86D26bD790fBae51A3C3abf07f77D6DC691A19',
}
DEPOSIT_PROXY = {
    'endpoint_address': '0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD'
}

CURRENCIES = {
    'DAI': {
        'module': 'erc20',
        'code': 'DAI',
        'name': 'DAI',
        'rate_usdc': 100,
        'token_address': '0x0000000000000000000000000000000000000000',
        'decimals': 18
    },
    'USDC': {
        'module': 'erc20',
        'code': 'USDC',
        'name': 'USDC',
        'rate_usdc': 100,
        'token_address': '0x0000000000000000000000000000000000000000',
        'decimals': 18
    },
    'USDT': {
        'module': 'erc20',
        'code': 'USDT',
        'name': 'USDT',
        'rate_usdc': 100,
        'token_address': '0x0000000000000000000000000000000000000000',
        'decimals': 18
    },
    'TUSD': {
        'module': 'erc20',
        'code': 'TUSD',
        'name': 'TUSD',
        'rate_usdc': 100,
        'token_address': '0x0000000000000000000000000000000000000000',
        'decimals': 18
    }
}

INITIAL_BLOCK_FOR_SCAN = 0

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

CELERY_TASK_ALWAYS_EAGER = True

STATIC_ROOT = None
STATICFILES_DIRS = [os.path.join(BASE_DIR), 'assets']
