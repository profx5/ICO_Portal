import os
from .social_auth import *

BASE_DIR = os.path.abspath(os.path.join(os.path.abspath(__file__), '../../../'))

SECRET_KEY = 'e%1h03sc5xmbr#q^r2l7h78-^1vuwapt8%eiumxyr@^91v61v^'

DEBUG = False

HOST = 'http://localhost:8000'

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'django_object_actions',
    'webpack_loader',
    'rest_framework',
    'social_django',

    'landing',
    'user_office',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware'
]

ROOT_URLCONF = 'ico_portal.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['frontend/landing/dist'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
            ],
        },
    },
]

WSGI_APPLICATION = 'ico_portal.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ico_portal',
        'USER': 'ico_portal_user',
        'PASSWORD': 'read_manual',
        'HOST': 'localhost'
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    # },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = False

STATIC_URL = '/static/'

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.dev.json'),
    }
}

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend/landing/dist/static"), # landing
]

MEDIA_URL = '/media/'
MEDIA_ROOT = '/tmp/ico_portal_media/'

CURRENCIES = {
    'ethereum_contract': {
        'code': 'ETH',
        'name': 'Ethereum',
        'module': 'ethereum_contract',
        'rpc_url': 'http://127.0.0.1:8545',
        'contract_address': '0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152',
        'sender_address': '0x73015966604928A312F79F7E69291a656Cb88602',
        'pre_kyc_threshold': 10000,
        'post_kyc_threshold': 5000000,
        'ico_info_path': os.path.join(BASE_DIR, 'ico_info.json')
    }
}

CELERY_BROKER_URL = 'amqp://ico_portal:read_manual@localhost:5672/ico_portal_vhost'
CELERY_TASK_SERIALIZER = 'pickle'
CELERY_ACCEPT_CONTENT = ['pickle']
CELERY_BEAT_SCHEDULE = {
    'check-contract-event': {
        'task': 'blockchain.ethereum_contract.tasks.check_events',
        'schedule': 30.0,
    }
}
CELERY_TASK_ROUTES = {
    'blockchain.ethereum_contract.tasks.check_events': {
        'queue': 'events_beat',
    },
}

KYC_ENABLED = True
