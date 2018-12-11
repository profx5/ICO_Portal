KYC_ENABLED = True

TOKEN_PRICE_IN_USD = 2
TOKEN_DECIMALS = 18

WEB3_RPC_URL = 'http://geth:123@localhost:8545'
RINKEBY_MIDDLEWARE = True

ETH_ACCOUNT = {'address': '0x73015966604928A312F79F7E69291a656Cb88602',
               'private_key': 'e362e876f03abf385273ff2f5f2d9b75903d34130942ef891c378815d5ae0b71'}

CROWDSALE_CONTRACT = {
    'address': '0x06299c552df3135e5d734c1a5e0dd913f3e415b9',
}
TOKEN_CONTRACT = {
    'address': '0xf87e63ec68237487e26a8c8f6d95f1212e5c377a',
}

DAI_CONTRACT = {
    'address': '0x012023eb1aae974631e6b21bb3b8537b07665215',
}

EXCHANGE_RATES = ['ETH', 'BTC']

CURRENCIES = {
    'DAI': {
        'module': 'DAI',
        'code': 'DAI',
        'name': 'DAI',
        'address': '0x06299c552df3135e5d734c1a5e0dd913f3e415b9',
        'contract': 'DAI_CONTRACT',
        'rate_usdc': 100
    }
}

TXN_TRACKER_RESEND_SECONDS = 600  # 10 minutes
RESEND_GAS_PRICE_FACTOR = 1.5

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
    'send_transactions': {
        'task': 'blockchain.ico.tasks.send_transactions',
        'schedule': 45
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
    'blockchain.ico.tasks.process_event': {
        'queue': 'events_beat',
    }
}
