KYC_ENABLED = True

THRESHOLDS = {
    'pre_kyc': 10000,
    'post_kyc': 5000000
}

TOKENS_PER_USD = 1
TOKEN_DECIMALS = 18

WEB3_RPC_URL = 'http://127.0.0.1:8545'

ETH_ACCOUNT = {'address': '0x73015966604928A312F79F7E69291a656Cb88602',
               'private_key': 'e362e876f03abf385273ff2f5f2d9b75903d34130942ef891c378815d5ae0b71'}

CROWDSALE_CONTRACT = {
    'address': '0x703941C626999Ede2F1630ea95AFCcB6b96a3857',
}
TOKEN_CONTRACT = {
    'address': '0x2feB9363a9bb1E16Ab90F6d4007264774e959F34',
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
        'code': 'LTCT',
        'name': 'Litecoin',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_secret': 'q123q123q123',
        'public_key': '3eaf230a98bd62a69305f1d06ca50f69095be5d23bef32c06b328eb0f134129f',
        'private_key': '87cbfc69BAB5fbdC910e9080b363d63352fc4fAdcDad46280b80767537849e24'
    },
    'bitcoin': {
        'module': 'coinpayments',
        'code': 'BTC',
        'name': 'Bitcoin',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_secret': 'q123q123q123',
        'public_key': '3eaf230a98bd62a69305f1d06ca50f69095be5d23bef32c06b328eb0f134129f',
        'private_key': '87cbfc69BAB5fbdC910e9080b363d63352fc4fAdcDad46280b80767537849e24'
    },
    'dash': {
        'module': 'coinpayments',
        'code': 'DASH',
        'name': 'Dash',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_secret': 'q123q123q123',
        'public_key': '3eaf230a98bd62a69305f1d06ca50f69095be5d23bef32c06b328eb0f134129f',
        'private_key': '87cbfc69BAB5fbdC910e9080b363d63352fc4fAdcDad46280b80767537849e24'
    }
}

EXCHANGE_RATES = ['ETH', 'LTC', 'BTC', 'DASH']

TXN_TRACKER_RESEND_SECONDS = 600 # 10 minutes
RESEND_GAS_PRICE_FACTOR = 1.1

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
    },
    'send_transactions': {
        'task': 'blockchain.ico.tasks.send_transactions',
        'schedule': 45.0
    },
    'track_transactions': {
        'task': 'blockchain.ico.tasks.track_transactions',
        'schedule': 60
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
    'blockchain.ico.tasks.send_transactions': {
        'queue': 'events_beat',
    },
    'blockchain.ico.tasks.track_transactions': {
        'queue': 'events_beat',
    },
}
