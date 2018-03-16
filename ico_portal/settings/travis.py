from .test import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ico_portal',
        'USER': 'travis',
        'PASSWORD': '',
        'HOST': '127.0.0.1'
    }
}
