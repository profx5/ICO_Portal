from django.db import DatabaseError

from blockchain.currencies.DAI.contract import DAIContract, DAITransfersFilter
from blockchain.ico.services.get_events import BaseGetEvents
from user_office.models import EventsProcessing


class GetDAITransfers(BaseGetEvents):
    start_block = 0
    contract_class = DAIContract
    filter_class = DAITransfersFilter

    def __init__(self, settings):
        super().__init__()

        self.settings = settings

    @property
    def from_contract(self):
        return self.settings.code

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
