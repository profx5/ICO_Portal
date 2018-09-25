from django.dispatch import Signal


txn_mined = Signal(providing_args=['transaction'])
