from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf import settings
from oslash import Right

from blockchain.ico.services import CollectReferralBonuses
from .services import SyncICOInfo, SyncExchangeRates, ProcessTransfer, \
    GetEvents, SendPreparedTxns, TrackTransactions, UpdatePriceOracle
from .services.update_price_oracle import TooLowChange, PendingUpdateExists

logger = get_task_logger(__name__)


@shared_task
def sync_ico_info():
    service = SyncICOInfo()

    result = service()

    if isinstance(result, Right):
        logger.info(f'ICO info successfully synced, ico_info_id={result.value.ico_info.id}')


@shared_task
def sync_exchange_rates():
    service = SyncExchangeRates()

    currencies_list = [
        curr_dict['code'] for curr_dict in settings.CURRENCIES.values()
    ]

    result = service(currencies_list)

    for currency, r in result.items():
        if isinstance(r, Right):
            logger.info(f'Exchange rate for {currency} successfully synced, result: {r.value}')


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


@shared_task
def update_price_oracle():
    result = UpdatePriceOracle()()

    if isinstance(result, TooLowChange):
        logger.info(f'PriceOracle rate update wasnt complete due to too low rate chage,'
                    f'actual_rate={result.value.actual_rate}, oracle_rate={result.value.oracle_rate}')
    elif isinstance(result, PendingUpdateExists):
        logger.info(f'Found Transaction with txn_id={result.value.txn_id} which is not mined. '
                    'Skiping PriceOracle rate update until transaction is mined')
    elif isinstance(result, Right):
        logger.info(f'PriceOracle rate successfully updated POUpdate.id={result.value.po_update.id} new_rate={result.value.new_rate}')


@shared_task
def collect_bonuses():
    result = CollectReferralBonuses()()
    for r in result:
        if isinstance(r, Right):
            logger.info(f'Prepared transaction on referral bonuses accrual for investor {r.investor.eth_account}')
