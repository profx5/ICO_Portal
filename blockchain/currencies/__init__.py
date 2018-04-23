import importlib
from functools import reduce


class Currencies:
    _instances = []
    _settings = {}

    @classmethod
    def get_currencies(cls):
        return cls._instances

    @classmethod
    def get_currency(cls, code):
        return [i for i in cls._instances if i.code == code][0]

    @classmethod
    def init_currency(cls, config):
        currency_module = importlib.import_module('blockchain.currencies.%s' % config['module'])
        settings_module = importlib.import_module('.settings', currency_module.__package__)
        settings_class = settings_module.Settings

        instance = settings_class(config)

        return instance

    @classmethod
    def init(cls, settings):
        cls._settings = settings

        cls._instances = [cls.init_currency(config)
                          for _, config in settings.items()]

    @classmethod
    def modules(cls):
        return ['blockchain.currencies.%s' % k for k, v in cls._settings.items()]

    @classmethod
    def get_urls(cls):
        def reducer(urls, instance):
            if hasattr(instance, 'urls'):
                return urls + [instance.urls]
            else:
                return urls


        return reduce(reducer, cls._instances, [])
