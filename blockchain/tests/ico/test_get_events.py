from ..base import BlockChainTestCase
from oslash import Right

from blockchain.ico.services.get_events import GetEvents, FilterNotFound


class TestingGetEvents(GetEvents):
    def get_new_entries(self, context):
        try:
            return self.success(entries=context.events_filter.get_new_entries())
        except ValueError as e:
            return self.fail_with(FilterNotFound('Filter not found'))
        except Exception as e:
            return self.fail(f'Error while getting new entries {e}')


class TestGetEvents(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['token']

    def test_events_getting(self):
        sender_account = self.account['address']
        self.mint_tokens(sender_account, 90000)
        self.mint_tokens(sender_account, 90000)

        result = GetEvents()()
        self.assertIsInstance(result, Right)

        entries = result.value.entries
        self.assertEqual(len(entries), 2)

        for event in result.value.entries:
            self.assertEqual(event.amount, 90000)
            self.assertEqual(event.to_account, sender_account)

    def test_same_filter_using(self):
        sender_account = self.account['address']
        self.mint_tokens(sender_account, 90000)

        result = GetEvents()()
        filter_id_1 = result.value.events_filter.filter_id

        result = GetEvents()()
        filter_id_2 = result.value.events_filter.filter_id

        self.assertEqual(filter_id_1, filter_id_2)

    def test_max_block_getting(self):
        last_block_number_node = self.eth_tester.get_block_by_number('latest')["number"]
        result = GetEvents()()

        last_block_number_db = result.value.events_processing.last_processed_block

        self.assertEqual(last_block_number_db, last_block_number_node)

    def test_filter_recreating(self):
        sender_account = self.account['address']
        self.mint_tokens(sender_account, 90000)
        result = GetEvents()()
        filter_id_1 = result.value.events_filter.filter_id
        self.eth_tester.delete_filter(1)

        result = TestingGetEvents()()
        self.assertIsInstance(result, Right)
        filter_id_2 = result.value.events_filter.filter_id

        self.assertNotEqual(filter_id_1, filter_id_2)
