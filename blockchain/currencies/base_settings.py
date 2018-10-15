class BaseSettings:
    def __init__(self, config):
        self._config = config

    def __getattr__(self, key):
        config = self.__getattribute__('_config')

        if key in config:
            return config[key]
        else:
            self.__getattribute__(key)

    def get_pay_address(self, investor):
        raise NotImplementedError
