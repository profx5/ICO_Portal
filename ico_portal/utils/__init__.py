from functools import wraps


def tuple_exclude(orig_tuple, exclude_items):
    return tuple(
        filter(
            lambda el: el not in exclude_items, orig_tuple
        )
    )


def is_mixed_case(string):
    return not (string.islower() or string.isupper())


class SecretNotFoundError(Exception):
    pass


def memoized_property(fget):
    attr_name = '_{0}'.format(fget.__name__)

    @wraps(fget)
    def fget_memoized(self):
        if not hasattr(self, attr_name):
            setattr(self, attr_name, fget(self))
        return getattr(self, attr_name)

    return property(fget_memoized)
