from celery import shared_task
from celery.utils.log import get_task_logger
from oslash import Right

from .services import SyncICOInfo, ProcessTransfer, GetEvents, \
    SendPreparedTxns, TrackTransactions

logger = get_task_logger(__name__)


@shared_task
def sync_ico_info():
    service = SyncICOInfo()

    result = service()

    if isinstance(result, Right):
        logger.info(f'ICO info successfully synced, ico_info_id={result.value.ico_info.id}')


@shared_task
def process_event(event):
    processor = ProcessTransfer()

    result = processor(event)

    if isinstance(result, Right):
        logger.info(f'Transfer with txn_hash {event.txn_hash} successfully processed (transfer_id={result.value.transfer.id}).')


@shared_task
def check_events():
    new_events = GetEvents()()

    if isinstance(new_events, Right):
        for event in new_events.value.entries:
            logger.info(f'Got event with transactionHash={event.txn_hash}')

            process_event.delay(event)


@shared_task
def send_transactions():
    result = SendPreparedTxns()()

    for r in result:
        if isinstance(r, Right):
            logger.info(f'Send trasaction {r.value.txn_object} result: {r.value.result}')


@shared_task
def track_transactions():
    result = TrackTransactions()()

    for r in result:
        if isinstance(r, Right):
            logger.info(f'Track trasaction {r.value.txn_object} result: {r.value.result}')
