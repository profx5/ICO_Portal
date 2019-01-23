import os
from .include import *

BASE_DIR = os.path.abspath(os.path.join(os.path.abspath(__file__), '../../../'))

SECRET_KEY = ''

HOST = 'http://localhost:8000'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'django_object_actions',
    'webpack_loader',
    'rest_framework',
    'social_django',
    'raven.contrib.django.raven_compat',

    'bootstrapform',
    'helpdesk',

    'user_office',
    'blockchain'
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

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'user_office.Investor'

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = False

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, "assets")

MEDIA_URL = '/media/'
LOGIN_URL = '/login/'

RAVEN_CONFIG = {
    'dsn': 'https://98e586745597476dafda3ea15296e38f:1495fcec1c6d4d55afeeed1dce5f05bd@sentry.io/1236224',
}

HOME_URL = 'https://ongrid.pro'

# Authorization settings
SIGNUP_CLOSED = True

# KYC settings
AUTO_APPROVE_KYC = False

# Email for special events report
SUPPORT_EMAIL = 'support@ongrid.pro'
