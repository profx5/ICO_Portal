from oslash import Left
from django.db import DatabaseError
from django.conf import settings

from user_office.models import EventsProcessing
from blockchain.ico.contracts.token import TokenContract, TransfersFilter
from ico_portal.utils.datetime import datetime
from ico_portal.utils.service_object import ServiceObject, service_call


class FilterNotFound(Left):
    def bind(self, func):
        return FilterNotFound(self._get_value())


class BaseGetEvents(ServiceObject):
    contract_class = None
    from_contract = None
    filter_class = None

    def __init__(self):
        self.contract = self.contract_class()

    @property
    def start_block(self):
        return settings.INITIAL_BLOCK_FOR_SCAN

    def find_events_processing(self):
        return EventsProcessing.objects \
                .filter(from_contract=self.from_contract) \
                .order_by('last_update_at').last()

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

    def wrap_filter(self, context):
        events_filter = self.filter_class(self.contract.web3, context.events_processing.filter_id)

        return self.success(events_filter=events_filter)

    def get_new_entries(self, context):
        try:
            return self.success(entries=context.events_filter.get_new_entries())
        except ValueError as e:
            if e.args == ({'code': -32000, 'message': 'filter not found'},):
                return self.fail_with(FilterNotFound('Filter not found'))
            else:
                return self.fail(f'Error while getting new entries {e}')
        except Exception as e:
            return self.fail(f'Error while getting new entries {e}')

    def get_all_entries(self, context):
        try:
            return self.success(entries=context.events_filter.get_all_entries())
        except ValueError as e:
            if e.args == ({'code': -32000, 'message': 'filter not found'},):
                return self.fail_with(FilterNotFound('Filter not found'))
            else:
                return self.fail(f'Error while getting all entries {e}')
        except Exception as e:
            return self.fail(f'Error while getting all entries {e}')

    def save_max_block(self, context):
        if context.entries:
            max_block = 0

            for e in context.entries:
                if e.block_number > max_block:
                    max_block = e.block_number

        else:
            max_block = self.contract.web3.eth.blockNumber

        try:
            events_processing = context.events_processing

            events_processing.last_processed_block = max_block
            events_processing.last_update_at = datetime.utcnow()
            events_processing.save()

            return self.success()
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self):
        events_processing = self.find_events_processing()

        if events_processing:
            result = self.success(events_processing=events_processing) | \
                                                     self.wrap_filter | \
                                                     self.get_new_entries

            if isinstance(result, FilterNotFound):
                from_block = events_processing.last_processed_block + 1

                self._reset_context()

                result = self.success(from_block=from_block) | \
                    self.create_events_processing | \
                    self.wrap_filter | \
                    self.get_all_entries
        else:
            result = self.success(from_block=self.start_block) | \
                self.create_events_processing | \
                self.wrap_filter | \
                self.get_all_entries

        return result | \
            self.save_max_block


class GetEvents(BaseGetEvents):
    contract_class = TokenContract
    filter_class = TransfersFilter
