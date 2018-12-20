from decimal import Decimal
from oslash import Right, Left
from celery.utils.log import get_task_logger

from ico_portal.utils import memoized_property
from blockchain.currencies.base_settings import BaseSettings
from .contract import DAIContract
from .services.get_dai_transfers import GetDAITransfers
from .services.process_dai_transfer import ProcessDAITransfer
from user_office.models import Account


class Settings(BaseSettings):
    def __init__(self, config):
        super().__init__(config)

        self.init_contract()

    def init_contract(self):
        DAIContract.init(self.contract)

    def get_pay_address(self, investor):
        acc = Account.objects.filter(investor=investor, currency='MEDIATOR').first()

        if acc:
            return Right(acc.address)
        else:
            return Left('account not found')

    @property
    def exchange_rate(self):
        return Decimal(self.rate_usdc) / 100

    # TASKS
    @memoized_property
    def transfers_processor(self):
        return ProcessDAITransfer(self)

    @memoized_property
    def events_getter(self):
        return GetDAITransfers(self)

    @memoized_property
    def tasks_logger(self):
        return get_task_logger(self.code)

    def register_tasks(self, app):
        @app.task(name=f'blockchain.ico.currencies.dai.tasks.process_dai_transfer({self.code})')
        def process_dai_transfer(event):
            result = self.transfers_processor(event)

            if isinstance(result, Right):
                self.tasks_logger.info(f'Transfer with txn_hash {event.txn_hash} '
                                       'successfully processed (transfer_id={result.value.transfer.id}).')
            else:
                self.tasks_logger.info(f'Transfer with txn_hash {event.txn_hash} '
                                       'processing failed with {result.value}')
        self.process_dai_transfer = process_dai_transfer

        @app.task(name=f'blockchain.ico.currencies.dai.tasks.check_dai_transfers({self.code})')
        def check_dai_transfers():
            result = self.events_getter()

            if isinstance(result, Right):
                for event in result.value.entries:
                    self.tasks_logger.info(f'Got event with transactionHash={event.txn_hash} from DAI contract')

                    process_dai_transfer.delay(event)
                else:
                    self.tasks_logger.info(f'Getting of DAI events failed with {result.value}')
        self.check_dai_transfers = check_dai_transfers
