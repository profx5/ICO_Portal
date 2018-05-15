class BaseSettings:
    def __init__(self, config):
        self._config = config

    def __getattr__(self, key):
        if key in self._config:
            return self._config[key]
        else:
            self.__getattribute__(key)
