KYC_ENABLED = True

TOKEN_PRICE_IN_USD = 2
TOKEN_DECIMALS = 18

WEB3_RPC_URL = 'http://127.0.0.1:8545'
RINKEBY_MIDDLEWARE = True

ETH_ACCOUNT = {'address': '0x73015966604928A312F79F7E69291a656Cb88602',
               'private_key': 'e362e876f03abf385273ff2f5f2d9b75903d34130942ef891c378815d5ae0b71'}

CROWDSALE_CONTRACT = {
    'address': '0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',
}
TOKEN_CONTRACT = {
    'address': '0xDf86D26bD790fBae51A3C3abf07f77D6DC691A19',
}
PRICE_ORACLE = {
    'address': '0x42ac0F356c84928258483631b740584E343B80b7',
    'sensivity': 3  # percents
}

CURRENCIES = {
    'ethereum': {
        'module': 'ethereum',
        'code': 'ETH',
        'name': 'Ethereum',
        'rpc_url': WEB3_RPC_URL,
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
}

EXCHANGE_RATES = ['ETH', 'BTC', 'DOGE']

TXN_TRACKER_RESEND_SECONDS = 600 # 10 minutes
RESEND_GAS_PRICE_FACTOR = 1.1

# Celery
CELERY_BROKER_URL = 'amqp://ico_portal:read_manual@localhost:5672/ico_portal_vhost'
CELERY_TASK_SERIALIZER = 'pickle'
CELERY_ACCEPT_CONTENT = ['pickle']
CELERY_BEAT_SCHEDULE = {
    'check-token-events': {
        'task': 'blockchain.ico.tasks.check_events',
        'schedule': 30,
    },
    'sync-ico-info': {
        'task': 'blockchain.ico.tasks.sync_ico_info',
        'schedule': 300,
    },
    'sync_exchange_rates': {
        'task': 'blockchain.ico.tasks.sync_exchange_rates',
        'schedule': 300
    },
    'send_transactions': {
        'task': 'blockchain.ico.tasks.send_transactions',
        'schedule': 45
    },
    'track_transactions': {
        'task': 'blockchain.ico.tasks.track_transactions',
        'schedule': 60
    },
    'update_price_oracle': {
        'task': 'blockchain.ico.tasks.update_price_oracle',
        'schedule': 300
    },
    'collect_bonuses': {
        'task': 'blockchain.ico.tasks.collect_bonuses',
        'schedule': 60
    },
}

CELERY_TASK_ROUTES = {
    'blockchain.ico.tasks.check_events': {
        'queue': 'events_beat',
    },
    'blockchain.ico.tasks.process_event': {
        'queue': 'events_beat',
    }
}
