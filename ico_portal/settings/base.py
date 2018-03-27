import os

BASE_DIR = os.path.abspath(os.path.join(os.path.abspath(__file__), '../../../'))

SECRET_KEY = 'e%1h03sc5xmbr#q^r2l7h78-^1vuwapt8%eiumxyr@^91v61v^'

DEBUG = False

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

AUTHENTICATION_BACKENDS = ['social_core.backends.twitter.TwitterOAuth',

                           'user_office.auth_backend.UserOfficeAuthBackend',
                           'django.contrib.auth.backends.ModelBackend']

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.dev.json'),
        }
}

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend/landing/dist/static"),
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

SOCIAL_AUTH_TWITTER_KEY = 'uamiOlPYD88lkVMwfS00mTiLi'
SOCIAL_AUTH_TWITTER_SECRET = 'hIewLBP2aKy1RIVsBsutP8MlkLgnjUIjuZiGtn6t77lt5XxoIZ'
SOCIAL_AUTH_USER_MODEL = 'user_office.Investor'
SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
)
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/user_office/'
