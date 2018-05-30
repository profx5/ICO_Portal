def tuple_exclude(orig_tuple, exclude_items):
    return tuple(
        filter(
            lambda el: el not in exclude_items, orig_tuple
        )
    )
