KYC_ENABLED = True

THRESHOLDS = {
    'pre_kyc': 10000,
    'post_kyc': 5000000
}

TOKENS_PER_USD = 1

WEB3_RPC_URL = 'http://127.0.0.1:8545'

DEFAULT_SENDER = '0x73015966604928A312F79F7E69291a656Cb88602'
CROWDSALE_CONTRACT = {
    'address': '0x7f6922701876447De9dd6482Ba1803faB1C04E7c',
    'sender': DEFAULT_SENDER
}
TOKEN_CONTRACT = {
    'address': '0x029B4Ec0e1A01BCEfFb64591b23315b1D81bd82A',
    'sender': DEFAULT_SENDER
}
PRICE_CONTRACT = {
    'address': '0x4D552A4fACc008CDf004833aaa1499a1eD5977c7',
    'sender': DEFAULT_SENDER
}

CURRENCIES = {
    'ethereum': {
        'code': 'ETH',
        'name': 'Ethereum',
        'module': 'ethereum',
        'rpc_url': WEB3_RPC_URL,
        'token_address': '0x029B4Ec0e1A01BCEfFb64591b23315b1D81bd82A',
    }
}

# Celery
CELERY_BROKER_URL = 'amqp://ico_portal:read_manual@localhost:5672/ico_portal_vhost'
CELERY_TASK_SERIALIZER = 'pickle'
CELERY_ACCEPT_CONTENT = ['pickle']
CELERY_BEAT_SCHEDULE = {
    'check-contract-event': {
        'task': 'blockchain.currencies.ethereum.tasks.check_events',
        'schedule': 30.0,
    },
    'sync-ico-info': {
        'task': 'blockchain.ico.tasks.sync_ico_info',
        'schedule': 300.0,
    }
}
CELERY_TASK_ROUTES = {
    'blockchain.currencies.ethereum.tasks.check_events': {
        'queue': 'events_beat',
    },
    'blockchain.ico.tasks.sync_ico_info': {
        'queue': 'events_beat',
    }
}
