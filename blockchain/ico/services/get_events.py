from oslash import Right, Left
from django.db import DatabaseError

from user_office.models import EventsProcessing
from blockchain.ico.contracts.token import TokenContract, TransfersFilter
from ico_portal.utils.datetime import datetime


class FilterNotFound(Left):
    def bind(self, func):
        return FilterNotFound(self._get_value())


class GetEvents:
    start_block = 0

    def __init__(self):
        self.contract = TokenContract()

    def create_events_processing(self, args):
        from_block = args.get('from_block')

        try:
            raw_filter = self.contract.get_filter(from_block)
        except ConnectionError as e:
            return Left(f'ConnectionError while creating filter {e}')

        events_processing = EventsProcessing(from_block=from_block,
                                             filter_id=raw_filter.filter_id)

        try:
            events_processing.save()

            return Right(dict(args, events_processing=events_processing))
        except DatabaseError as e:
            return Left(f'Error while saving EventsProcessing {e}')

    def find_events_processing(self):
        return EventsProcessing.objects.order_by('last_update_at').last()

    def wrap_filter(self, args):
        events_filter = TransfersFilter(self.contract.web3, args['events_processing'].filter_id)

        return Right(dict(args, events_filter=events_filter))

    def get_new_entries(self, args):
        events_filter = args['events_filter']

        try:
            return Right(dict(args, entries=events_filter.get_new_entries()))
        except ValueError as e:
            if e.args == ({'code': -32000, 'message': 'filter not found'},):
                return FilterNotFound('Filter not found')
            else:
                return Left(f'Error while getting new entries {e}')
        except Exception as e:
            return Left(f'Error while getting new entries {e}')

    def get_all_entries(self, args):
        events_filter = args['events_filter']

        try:
            return Right(dict(args, entries=events_filter.get_all_entries()))
        except ValueError as e:
            if e.args == ({'code': -32000, 'message': 'filter not found'},):
                return FilterNotFound('Filter not found')
            else:
                return Left(f'Error while getting new entries {e}')
        except Exception as e:
            return Left(f'Error while getting new entries {e}')

    def save_max_block(self, args):
        if args['entries']:
            max_block = 0

            for e in args['entries']:
                if e.block_number > max_block:
                    max_block = e.block_number

            last_block = args['events_processing'].last_processed_block

            if last_block is None or last_block < max_block:
                try:
                    events_processing = args['events_processing']

                    events_processing.last_processed_block = max_block
                    events_processing.last_update_at = datetime.utcnow()
                    events_processing.save()
                except DatabaseError as e:
                    return Left(f'Error while saving EventsProcessing {e}')

        return Right(args)

    def return_entries(self, args):
        return Right(args['entries'])

    def __call__(self):
        events_processing = self.find_events_processing()

        if events_processing:
            result = Right({'events_processing': events_processing}) | \
                     self.wrap_filter | \
                     self.get_new_entries

            if isinstance(result, FilterNotFound):
                from_block = events_processing.last_processed_block + 1

                result = Right({'from_block': from_block}) | \
                    self.create_events_processing | \
                    self.wrap_filter | \
                    self.get_all_entries
        else:
            result = Right({'from_block': self.start_block}) | \
                self.create_events_processing | \
                self.wrap_filter | \
                self.get_all_entries

        return result | \
            self.save_max_block | \
            self.return_entries
