from django.db import DatabaseError

from blockchain.currencies.erc20.contract import ERC20Token, TransfersFilter
from blockchain.ico.services.get_events import BaseGetEvents
from user_office.models import EventsProcessing


class GetTransfers(BaseGetEvents):
    def __init__(self, settings):
        self.settings = settings
        self.contract = settings.contract

    @property
    def from_contract(self):
        return self.settings.code

    def wrap_filter(self, context):
        events_filter = TransfersFilter(self.contract, self.contract.web3, context.events_processing.filter_id)

        return self.success(events_filter=events_filter)

    def create_events_processing(self, context):
        try:
            raw_filter = self.contract.get_filter(context.from_block)
        except ConnectionError as e:
            return self.fail(e)

        events_processing = EventsProcessing(from_block=context.from_block,
                                             filter_id=raw_filter.filter_id,
                                             from_contract=self.from_contract)

        try:
            events_processing.save()

            return self.success(events_processing=events_processing)
        except DatabaseError as e:
            return self.fail(e)
