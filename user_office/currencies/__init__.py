from .ethereum import Ethereum


AVAILABLE_CURRENCIES = {
    'ETH': Ethereum
}

ENABLED_CURRENCIES = ['ETH']


def get_enabled_currencies():
    return [v for k, v in AVAILABLE_CURRENCIES.items() if k in ENABLED_CURRENCIES]

def get_currency(code):
    return AVAILABLE_CURRENCIES.get(code)
