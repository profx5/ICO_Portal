from django.apps import AppConfig


class UserOfficeConfig(AppConfig):
    name = 'user_office'

    def ready(self):
        from . import receivers  # noqa: F401
