from decimal import Decimal
from oslash import Right, Left
from celery.utils.log import get_task_logger

from ico_portal.utils import memoized_property
from blockchain.currencies.base_settings import BaseSettings
from blockchain.currencies.erc20.contract import ERC20Token
from blockchain.currencies.erc20.services import GetTransfers
from blockchain.currencies.erc20.services.process_transfer import ProcessTransfer
from user_office.models import Account


class Settings(BaseSettings):
    def get_pay_address(self, investor):
        acc = Account.objects.filter(investor=investor, currency='PROXY').first()

        if acc:
            return Right(acc.address)
        else:
            return Left('account not found')

    @property
    def exchange_rate(self):
        return Decimal(self.rate_usdc) / 100

    @property
    def contract(self):
        return ERC20Token(self)

    @property
    def contract_address(self):
        return self.token_address

    # TASKS
    @memoized_property
    def transfers_processor(self):
        return ProcessTransfer(self)

    @memoized_property
    def events_getter(self):
        return GetTransfers(self)

    @memoized_property
    def tasks_logger(self):
        return get_task_logger(self.code)

    def register_tasks(self, app):
        @app.task(name=f'blockchain.ico.currencies.erc20.tasks.process_transfer({self.code})')
        def process_transfer(event):
            result = self.transfers_processor(event)

            if isinstance(result, Right):
                self.tasks_logger.info(f'Transfer with txn_hash {event.txn_hash} successfully processed')
            else:
                self.tasks_logger.info(f'Transfer with txn_hash {event.txn_hash} '
                                       f'processing failed with {result.value}')
        self.process_transfer = process_transfer

        @app.task(name=f'blockchain.ico.currencies.erc20.tasks.check_transfers({self.code})')
        def check_transfers():
            result = self.events_getter()

            if isinstance(result, Right):
                for event in result.value.entries:
                    self.tasks_logger.info(f'Got event with transactionHash={event.txn_hash} from erc20 contract')

                    process_transfer.delay(event)
            else:
                self.tasks_logger.info(f'Getting of erc20 events failed with {result.value}')
        self.check_transfers = check_transfers
