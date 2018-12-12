KYC_ENABLED = True

TOKEN_PRICE_IN_USD = 1
TOKEN_DECIMALS = 18

WEB3_RPC_URL = 'http://geth:123@localhost:8545'
RINKEBY_MIDDLEWARE = True

ETH_ACCOUNT = {'address': '0x73015966604928A312F79F7E69291a656Cb88602',
               'private_key': 'e362e876f03abf385273ff2f5f2d9b75903d34130942ef891c378815d5ae0b71'}

CROWDSALE_CONTRACT = {
    'address': '0x181E6D8bb963768c1791870C93718C3fccd6766e',
}
TOKEN_CONTRACT = {
    'address': '0x5917dDC7cCdA1A8F8a14f065BE7CD08616c066F1',
}

EXCHANGE_RATES = ['ETH']

CURRENCIES = {
    'DAI': {
        'module': 'DAI',
        'code': 'DAI',
        'name': 'DAI',
        'receiver_address': '0x42ac0F356c84928258483631b740584E343B80b7',
        'rate_usdc': 100,
        'contract': {
            'address': '0x365E44150e248ea0f51756E2475ce5AF30542301',
            'decimals': 18
        }
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
        'schedule': 30
    },
    'send_transactions': {
        'task': 'blockchain.ico.tasks.send_transactions',
        'schedule': 45
    },
    'track_transactions': {
        'task': 'blockchain.ico.tasks.track_transactions',
        'schedule': 60
    },
    'check-dai-transfers': {
        'task': 'blockchain.ico.currencies.dai.tasks.check_dai_transfers(DAI)',
        'schedule': 30
    }
}

CELERY_TASK_ROUTES = {
    'blockchain.ico.tasks.check_events': {
        'queue': 'events_beat'
    },
    'blockchain.ico.tasks.process_event': {
        'queue': 'events_beat'
    },
    'blockchain.ico.currencies.dai.tasks.check_dai_transfers(DAI)': {
        'queue': 'events_beat'
    },
    'blockchain.ico.currencies.dai.tasks.process_dai_transfer(DAI)': {
        'queue': 'events_beat'
    }
}
