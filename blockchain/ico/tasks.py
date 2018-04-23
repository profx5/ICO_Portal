from celery import shared_task
from celery.utils.log import get_task_logger
from oslash import Right
from django.conf import settings

from .services import SyncICOInfo, SyncExchangeRates, ProcessTransfer
from .contracts.token import TokenContract, TransferEvent

logger = get_task_logger(__name__)

@shared_task
def sync_ico_info():
    service = SyncICOInfo()

    result = service()

    if isinstance(result, Right):
        logger.info('ICO info successfully synced, ico_id = %s' %
                    result.value['ico_info'].id)
    else:
        logger.error('Erorr while syncing ico info, %s' % result.value)

@shared_task
def sync_exchange_rates():
    service = SyncExchangeRates()

    result = service(settings.EXCHANGE_RATES)

    for currency, r in result.items():
        if isinstance(r, Right):
            logger.info('Exchange rate for %s successfully synced, rate_id = %s' % (
                currency,
                r.value['obj'].id))
        else:
            logger.error('Erorr while syncing exchange rate for %s, %s' % (
                currency,
                r.value))

@shared_task
def process_event(entry):
    processor = ProcessTransfer()

    result = processor(entry)

    if isinstance(result, Right):
        logger.info('Transfer from txn %s was successfully processed (to_id=%s).' % (
            result.value['event'].txn_hash,
            result.value['transfer'].id))
    else:
        logger.error('Got error while processing transfer from txn %s, %s' % (
            entry['transactionHash'].hex(),
            result.value))

@shared_task
def check_events():
    events_filter = TokenContract().get_events_filter()

    new_entries = events_filter.get_new_entries()

    for entry in new_entries:
        logger.info('Got entry with transactionHash=%s ' %
                    entry['transactionHash'].hex())

        event = TransferEvent(entry)
        process_event.delay(event)
