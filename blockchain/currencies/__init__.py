import importlib


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
    def init_currency(cls, module_name, config):
        currency_module = importlib.import_module('blockchain.currencies.%s' % module_name)
        settings_module = importlib.import_module('.settings', currency_module.__package__)
        settings_class = settings_module.Settings

        settings_class.init(config)

        return settings_class()

    @classmethod
    def init(cls, settings):
        cls._settings = settings

        cls._instances = [cls.init_currency(module_name, config)
                          for module_name, config in settings.items()]

    @classmethod
    def modules(cls):
        return ['blockchain.currencies.%s' % k for k, v in cls._settings.items()]
