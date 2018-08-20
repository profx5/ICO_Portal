from django.conf import settings


def get_referral_tokens_treshold():
    return settings.REFERRAL_TOKENS_THRESHOLD * 10 ** settings.TOKEN_DECIMALS
