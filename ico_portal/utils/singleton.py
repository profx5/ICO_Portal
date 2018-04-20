class SingletonType(type):
    """Metaclass for Singleton pattern implementation
    """

    __instance = None

    def __call__(mcs, *args, **kwargs):
        if mcs.__instance is None:
            mcs.__instance = super().__call__(*args, **kwargs)

        return mcs.__instance
