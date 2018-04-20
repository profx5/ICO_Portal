from celery import shared_task
from celery.utils.log import get_task_logger
from oslash import Right

from .services import SyncICOInfo

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
