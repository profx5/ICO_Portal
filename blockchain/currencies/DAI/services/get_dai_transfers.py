from django.conf import settings
from django.db import DatabaseError

from blockchain.ico.contracts.dai import DAIContract, DAITransfersFilter
from blockchain.ico.services.get_events import BaseGetEvents
from user_office.models import EventsProcessing


class GetDAITransfers(BaseGetEvents):
    start_block = 0
    contract_class = DAIContract
    from_contract = 'DAI'
    filter_class = DAITransfersFilter

    def create_events_processing(self, context):
        try:
            raw_filter = self.contract.get_filter(settings.CURRENCIES['DAI']['address'], context.from_block)
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
