from django import template
from django.conf import settings

register = template.Library()


@register.simple_tag
def site_url():
    return settings.HOME_URL


@register.simple_tag
def is_signup_open():
    return not settings.SIGNUP_CLOSED


@register.simple_tag
def host_url():
    return settings.HOST
