import os

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
