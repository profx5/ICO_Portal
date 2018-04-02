from celery import shared_task

from .settings import Settings
from .processor import Processor
from .event import Event

@shared_task
def process_event(event):
    print('Starting processing event with txn_hash=%s' % event.txn_hash)
    processor = Processor(Settings())

    processor(event)

@shared_task
def check_events():
    print('Checking new filter entries')

    events_filter = Settings.get_events_filter()

    new_entries = events_filter.get_new_entries()

    for entry in new_entries:
        print('Got entry with transactionHash=%s ' %
              entry['transactionHash'].hex())

        event = Event(entry)
        process_event.delay(event)

@shared_task
def set_investment_threshold(address, threshold=None):
    if threshold is None:
        threshold = Settings.config('post_kyc_threshold')

    print('Set investment threshold for account {0} to {1}'.format(address,
                                                                   threshold))

    contract = Settings.contract

    return contract.functions.setInvestmentThreshold(address, threshold).transact({
        'from': Settings.config('sender_address'),
         'gas': 100000
    }).hex()
