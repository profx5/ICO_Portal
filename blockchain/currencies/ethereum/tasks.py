from celery import shared_task
from celery.utils.log import get_task_logger
from oslash import Right

from .settings import Settings
from .services import ProcessEvent
from .event import Event

logger = get_task_logger(__name__)

@shared_task
def process_event(entry):
    processor = ProcessEvent(Settings())

    result = processor(entry)

    if isinstance(result, Right):
        logger.info('Entry with transactionHash=%s was successfully processed (deposit_id=%s).' % (
            result.value['event'].txn_hash,
            result.value['deposit'].id
        ))
    else:
        logger.error('Got error while processing entry with transactionHash=%s, %s' % (
            entry['transactionHash'].hex(),
            result.value
        ))

@shared_task
def check_events():
    events_filter = Settings().get_events_filter()

    new_entries = events_filter.get_new_entries()

    for entry in new_entries:
        logger.info('Got entry with transactionHash=%s ' %
                    entry['transactionHash'].hex())

        event = Event(entry)
        process_event.delay(event)
