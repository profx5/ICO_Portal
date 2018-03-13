import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'e%1h03sc5xmbr#q^r2l7h78-^1vuwapt8%eiumxyr@^91v61v^'

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'webpack_loader',
    'rest_framework',
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

AUTHENTICATION_BACKENDS = ['user_office.auth_backend.UserOfficeAuthBackend',
                           'django.contrib.auth.backends.ModelBackend']

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.dev.json'),
        }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
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
        'token_price': 1000,
        'rpc_url': 'http://127.0.0.1:8545',
        'contract_address': '0xF69C63e7a39b56b69E09b21496B46005bF950458',
        'confirmations_required': 1,
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
    'blockchain.ethereum_contract.tasks.process_event': {
        'queue': 'events'
    }
}

KYC_ENABLED = True
