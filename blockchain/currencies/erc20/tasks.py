from celery import shared_task
from celery.utils.log import get_task_logger
from oslash import Right

from .services.get_dai_transfers import GetDAITransfers
from .services.process_dai_transfer import ProcessDAITransfer

logger = get_task_logger(__name__)


@shared_task
def process_dai_transfer(event):
    processor = ProcessDAITransfer()

    result = processor(event)

    if isinstance(result, Right):
        logger.info(f'Transfer with txn_hash {event.txn_hash} successfully processed (transfer_id={result.value.transfer.id}).')
    else:
        logger.info(f'Transfer with txn_hash {event.txn_hash} processing failed with {result.value}')


@shared_task
def check_dai_transfers():
    result = GetDAITransfers()()

    if isinstance(result, Right):
        for event in result.value.entries:
            logger.info(f'Got event with transactionHash={event.txn_hash} from DAI contract')

            process_dai_transfer.delay(event)
    else:
        logger.info(f'Getting of DAI events failed with {result.value}')
