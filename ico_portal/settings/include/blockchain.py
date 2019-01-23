KYC_ENABLED = True

TOKEN_PRICE_IN_USD = 1
TOKEN_DECIMALS = 18

WEB3_RPC_URL = 'http://localhost:8545'
RINKEBY_MIDDLEWARE = True

ETH_ACCOUNT = {'address': '0x73015966604928A312F79F7E69291a656Cb88602',
               'private_key': 'e362e876f03abf385273ff2f5f2d9b75903d34130942ef891c378815d5ae0b71'}

CROWDSALE_CONTRACT = {
    'address': '0xa280990230C4089Bc05a0Df76Fb36C793AF21c2d',
}
TOKEN_CONTRACT = {
    'address': '0x7970EF70a49AdC4c7243987520d86bDbd79643D5',
}
DEPOSIT_PROXY = {
    'endpoint_address': '0xa280990230C4089Bc05a0Df76Fb36C793AF21c2d'
}

CURRENCIES = {
    'DAI': {
        'module': 'erc20',
        'code': 'DAI',
        'name': 'DAI',
        'rate_usdc': 100,
        'token_address': '0xdE1a39453fC86E42Cf917Ca77eb67BB2372f24a2',
        'decimals': 18
    },
    'USDC': {
        'module': 'erc20',
        'code': 'USDC',
        'name': 'USDC',
        'rate_usdc': 100,
        'token_address': '0x41c33720F187c1AFBa5995960DA8B518D03457b1',
        'decimals': 18
    }
}


TXN_TRACKER_RESEND_SECONDS = 600  # 10 minutes
RESEND_GAS_PRICE_FACTOR = 1.5
MAX_TXNS_RESEND_QUANTITY = 5

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
    # 'check-dai-transfers': {
    #     'task': 'blockchain.ico.currencies.dai.tasks.check_dai_transfers(DAI)',
    #     'schedule': 30
    # }
}

CELERY_TASK_ROUTES = {
    'blockchain.ico.tasks.check_events': {
        'queue': 'events_beat'
    },
    'blockchain.ico.tasks.process_event': {
        'queue': 'events_beat'
    },
    # 'blockchain.ico.currencies.dai.tasks.check_dai_transfers(DAI)': {
    #     'queue': 'events_beat'
    # },
    # 'blockchain.ico.currencies.dai.tasks.process_dai_transfer(DAI)': {
    #     'queue': 'events_beat'
    # }
}
