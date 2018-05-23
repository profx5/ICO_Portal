from celery import shared_task
from celery.utils.log import get_task_logger
from oslash import Right
from django.conf import settings

from .services import SyncICOInfo, SyncExchangeRates, ProcessTransfer, \
    GetEvents

logger = get_task_logger(__name__)

@shared_task
def sync_ico_info():
    service = SyncICOInfo()

    result = service()

    if isinstance(result, Right):
        logger.info(f"ICO info successfully synced, ico_info_id={result.value['ico_info'].id}")
    else:
        logger.error(f'Erorr while syncing ico info, {result.value}')

@shared_task
def sync_exchange_rates():
    service = SyncExchangeRates()

    result = service(settings.EXCHANGE_RATES)

    for currency, r in result.items():
        if isinstance(r, Right):
            logger.info(f"Exchange rate for {currency} successfully synced, rate_id={r.value['obj'].id}")
        else:
            logger.error(f'Erorr while syncing exchange rate for {currency}, {r.value}')

@shared_task
def process_event(event):
    processor = ProcessTransfer()

    result = processor(event)

    if isinstance(result, Right):
        logger.info(f"Transfer with txn_hash {event.txn_hash} successfully processed (transfer_id={result.value['transfer'].id}).")
    else:
        logger.error(f'Got error while processing transfer with txn_hash {event.txn_hash}, {result.value}')

@shared_task
def check_events():
    new_events = GetEvents()()

    if isinstance(new_events, Right):
        for event in new_events.value:
            logger.info(f'Got event with transactionHash={event.txn_hash}')

            process_event.delay(event)
    else:
        logger.info(f'Got error while checking events {new_events.value}')
