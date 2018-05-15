KYC_ENABLED = True

THRESHOLDS = {
    'pre_kyc': 10000,
    'post_kyc': 5000000
}

TOKENS_PER_USD = 1
TOKEN_DECIMALS = 2

WEB3_RPC_URL = 'http://127.0.0.1:8545'

DEFAULT_ACCOUNT = {'address': '0x73015966604928A312F79F7E69291a656Cb88602',
                   'private_key': 'e362e876f03abf385273ff2f5f2d9b75903d34130942ef891c378815d5ae0b71'}

CROWDSALE_CONTRACT = {
    'address': '0x703941C626999Ede2F1630ea95AFCcB6b96a3857',
    'account': DEFAULT_ACCOUNT
}
TOKEN_CONTRACT = {
    'address': '0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
    'account': DEFAULT_ACCOUNT
}

CURRENCIES = {
    'ethereum': {
        'module': 'ethereum',
        'code': 'ETH',
        'name': 'Ethereum',
        'rpc_url': WEB3_RPC_URL,
    },
    'litecoin': {
        'module': 'coinpayments',
        'code': 'LTC',
        'name': 'Litecoin',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_secret': 'q123q123q123',
        'public_key': 'a2308cc5846557e67b377623dbd2ce939a5fd997ab8302e2295ae65ba1d757e7',
        'private_key': '508055A03f88Cd1217f6B724878Ff238d43E961d89E5cCb5be7182F3713613c6'
    }
}

EXCHANGE_RATES = ['ETH', 'LTC']

# Celery
CELERY_BROKER_URL = 'amqp://ico_portal:read_manual@localhost:5672/ico_portal_vhost'
CELERY_TASK_SERIALIZER = 'pickle'
CELERY_ACCEPT_CONTENT = ['pickle']
CELERY_BEAT_SCHEDULE = {
    'check-token-events': {
        'task': 'blockchain.ico.tasks.check_events',
        'schedule': 30.0,
    },
    'sync-ico-info': {
        'task': 'blockchain.ico.tasks.sync_ico_info',
        'schedule': 300.0,
    },
    'sync_exchange_rates': {
        'task': 'blockchain.ico.tasks.sync_exchange_rates',
        'schedule': 300.0
    }
}
CELERY_TASK_ROUTES = {
    'blockchain.ico.tasks.check_events': {
        'queue': 'events_beat',
    },
    'blockchain.ico.tasks.sync_ico_info': {
        'queue': 'events_beat',
    },
    'blockchain.ico.tasks.sync_exchange_rates': {
        'queue': 'events_beat',
    },
}
