KYC_ENABLED = True

TOKEN_PRICE_IN_USD = 1
TOKEN_DECIMALS = 18

WEB3_RPC_URL = 'wss://rinkeby.infura.io/ws/v3/d364ebb134ef4453aaa4b350e7ab47ae'
RINKEBY_MIDDLEWARE = True

ETH_ACCOUNT = {'address': '0x73015966604928A312F79F7E69291a656Cb88602',
               'private_key': 'e362e876f03abf385273ff2f5f2d9b75903d34130942ef891c378815d5ae0b71'}

CROWDSALE_CONTRACT = {
    'address': '0xe6AE7D3a7348CC0e45a6c599b7f56A9fD0b0BB01',
}
TOKEN_CONTRACT = {
    'address': '0xFbBd9A200E643a00dA94F5273244B41Ce91D7542',
}
DEPOSIT_PROXY = {
    'endpoint_address': '0xe6AE7D3a7348CC0e45a6c599b7f56A9fD0b0BB01'
}

CURRENCIES = {
    'DAI': {
        'module': 'erc20',
        'code': 'DAI',
        'name': 'DAI',
        'rate_usdc': 100,
        'token_address': '0x0478E00f031455b7bf84856E9ff261F103D6234c',
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

INITIAL_BLOCK_FOR_SCAN = 3747239
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
    'check-dai-transfers': {
        'task': 'blockchain.ico.currencies.erc20.tasks.check_transfers(DAI)',
        'schedule': 30
    },
    'check-usdc-transfers': {
        'task': 'blockchain.ico.currencies.erc20.tasks.check_transfers(USDC)',
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
    'blockchain.ico.currencies.erc20.tasks.check_transfers(DAI)': {
        'queue': 'events_beat'
    },
    'blockchain.ico.currencies.erc20.tasks.process_transfer(DAI)': {
        'queue': 'events_beat'
    },
    'blockchain.ico.currencies.erc20.tasks.check_transfers(USDC)': {
        'queue': 'events_beat'
    },
    'blockchain.ico.currencies.erc20.tasks.process_transfer(USDC)': {
        'queue': 'events_beat'
    },
}
