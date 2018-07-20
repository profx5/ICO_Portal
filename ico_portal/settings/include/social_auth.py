import os

SOCIAL_AUTH_USER_MODEL = 'user_office.Investor'

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'user_office.auth_steps.associate_user',
    'social_core.pipeline.social_auth.load_extra_data')

SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/user_office/'
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

AUTHENTICATION_BACKENDS = ['user_office.auth_backend.EmailBackend',
                           'user_office.auth_backend.MetamaskBackend',
                           'social_core.backends.email.EmailAuth',
                           'social_core.backends.twitter.TwitterOAuth',
                           'social_core.backends.facebook.FacebookOAuth2',
                           'social_core.backends.google.GoogleOAuth2',
                           'social_core.backends.linkedin.LinkedinOAuth2',

                           'user_office.auth_backend.AdminUserBackend']

# Twitter
SOCIAL_AUTH_TWITTER_KEY = 'uamiOlPYD88lkVMwfS00mTiLi'
SOCIAL_AUTH_TWITTER_SECRET = 'hIewLBP2aKy1RIVsBsutP8MlkLgnjUIjuZiGtn6t77lt5XxoIZ'

# Facebook
SOCIAL_AUTH_FACEBOOK_KEY = '2089194278032302'
SOCIAL_AUTH_FACEBOOK_SECRET = '48554d51fe92f6a762b6da59a1a7e830'
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
  'locale': 'en_US',
  'fields': 'id, email'
}

# Google
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '144225632595-pc1skueqj3i3rcth4j242ehj97sc7bgf.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'qONaKbrKD4r40DgapnwNVnnr'

# LinkedIn
SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY = '7857tmj1465z2l'
SOCIAL_AUTH_LINKEDIN_OAUTH2_SECRET = 'kXFRepE1TwA8Mrav'

# Email
SOCIAL_AUTH_EMAIL_PIPELINE = (
    'user_office.auth_steps.check_recaptcha',
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.mail.mail_validation',
    'social_core.pipeline.user.create_user',
    'user_office.auth_steps.set_referrer',
    'user_office.auth_steps.user_password',
    'user_office.auth_steps.associate_user')

SOCIAL_AUTH_EMAIL_VALIDATION_FUNCTION = 'user_office.auth_steps.send_validation_email'
SOCIAL_AUTH_EMAIL_VALIDATION_URL = '/email_validation/'

EMAIL_HOST = os.environ.get('ICO_EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_HOST_USER = os.environ.get('ICO_EMAIL_USER')
EMAIL_HOST_PASSWORD = os.environ.get('ICO_EMAIL_PASSWORD')
DEFAULT_FROM_EMAIL = os.environ.get('ICO_EMAIL_DEFAULT_FROM')

RECAPTCHA_DATA_SITEKEY = '6Lf9n1IUAAAAAN2HIdZRL9RXCxXyiWb6YQ9i344A'
RECAPTCHA_SECRET = '6Lf9n1IUAAAAAMoqA75RIx1vLi6ESNWyKBMreH04'

METAMASK_LOGIN_TOKEN_PERIOD = 300 # 5 minutes
