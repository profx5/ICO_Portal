from django.test import override_settings
from oslash import Right
from decimal import Decimal
import django.core.mail

from ..base import BlockChainTestCase
from user_office.factories import InvestorFactory, TokensMoveFactory, TransferFactory
from user_office.models import Transfer, TokensMove, Payment, Investor
from blockchain.ico.services import ProcessTransfer, SendPreparedTxns


# TOKENS_FOR_20_ETH = Decimal('6601800000000000000000')


class TestProcessTransfer(BlockChainTestCase):
    setup_eth_tester = True
    setup_contracts = ['token', 'crowdsale']

    def setup_purchase(self, recipient):
        txn_hash = self.process_payment(recipient.eth_account, 2000)
        event = self.get_transfer_event(txn_hash)

        result = ProcessTransfer()(event)
        self.assertTrue(isinstance(result, Right))
        return txn_hash

    def test_transfer_tokens_to_existing_account(self):
        sender_account = self.eth_tester.get_accounts()[0]
        sender = InvestorFactory(eth_account=sender_account)

        recepient_account = self.eth_tester.get_accounts()[1]
        recepient = InvestorFactory(eth_account=recepient_account)

        mint_txn_hash = self.mint_tokens(sender_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(mint_txn_hash))
        self.assertIsInstance(result, Right)

        transfer_txn_hash = self.transfer_tokens(sender_account, recepient_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(transfer_txn_hash))
        self.assertIsInstance(result, Right)

        recepient.refresh_from_db()
        self.assertEqual(recepient.tokens_amount, Decimal('90000'))

        sender.refresh_from_db()
        self.assertEqual(sender.tokens_amount, Decimal('0'))

        self.assertEqual(Transfer.objects.count(), 2)
        transfer = Transfer.objects.last()
        self.assertEqual(transfer.txn_hash, transfer_txn_hash)

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(TokensMove.objects.count(), 4)

        tokens_moves = TokensMove.objects.filter(transfer=transfer)

        self.assertEqual(tokens_moves[0].investor, recepient)
        self.assertEqual(tokens_moves[0].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[0].created_at, self.utcnow)
        self.assertEqual(tokens_moves[0].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[0].transfer, transfer)
        self.assertEqual(tokens_moves[0].state, 'ACTUAL')
        self.assertEqual(tokens_moves[0].direction, 'IN')

        self.assertEqual(tokens_moves[1].investor, sender)
        self.assertEqual(tokens_moves[1].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[1].created_at, self.utcnow)
        self.assertEqual(tokens_moves[1].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[1].transfer, transfer)
        self.assertEqual(tokens_moves[1].state, 'ACTUAL')
        self.assertEqual(tokens_moves[1].direction, 'OUT')

    def test_transfer_tokens_to_nonexisting_account(self):
        sender_account = self.eth_tester.get_accounts()[0]
        sender = InvestorFactory(eth_account=sender_account)

        recepient_account = self.eth_tester.get_accounts()[1]

        mint_txn_hash = self.mint_tokens(sender_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(mint_txn_hash))
        self.assertIsInstance(result, Right)

        transfer_txn_hash = self.transfer_tokens(sender_account, recepient_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(transfer_txn_hash))
        self.assertIsInstance(result, Right)

        sender.refresh_from_db()
        self.assertEqual(sender.tokens_amount, Decimal('0'))

        self.assertEqual(Transfer.objects.count(), 2)
        transfer = Transfer.objects.last()
        self.assertEqual(transfer.txn_hash, transfer_txn_hash)

        self.assertEqual(TokensMove.objects.count(), 4)

        tokens_moves = TokensMove.objects.filter(transfer=transfer)
        self.assertEqual(tokens_moves[0].investor_id, recepient_account)
        self.assertEqual(tokens_moves[0].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[0].created_at, self.utcnow)
        self.assertEqual(tokens_moves[0].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[0].transfer, transfer)
        self.assertEqual(tokens_moves[0].state, 'ACTUAL')
        self.assertEqual(tokens_moves[0].direction, 'IN')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[0].investor

        self.assertEqual(tokens_moves[1].investor, sender)
        self.assertEqual(tokens_moves[1].investor_id, sender_account)
        self.assertEqual(tokens_moves[1].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[1].created_at, self.utcnow)
        self.assertEqual(tokens_moves[1].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[1].transfer, transfer)
        self.assertEqual(tokens_moves[1].state, 'ACTUAL')
        self.assertEqual(tokens_moves[1].direction, 'OUT')

    def test_transfer_between_nonexisting_accounts(self):
        sender_account = self.eth_tester.get_accounts()[0]
        recepient_account = self.eth_tester.get_accounts()[1]

        mint_txn_hash = self.mint_tokens(sender_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(mint_txn_hash))
        self.assertIsInstance(result, Right)

        transfer_txn_hash = self.transfer_tokens(sender_account, recepient_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(transfer_txn_hash))
        self.assertIsInstance(result, Right)

        self.assertEqual(Transfer.objects.count(), 2)
        transfer = Transfer.objects.last()
        self.assertEqual(transfer.txn_hash, transfer_txn_hash)

        self.assertEqual(TokensMove.objects.count(), 4)

        tokens_moves = TokensMove.objects.filter(transfer=transfer)
        self.assertEqual(tokens_moves[0].investor_id, recepient_account)
        self.assertEqual(tokens_moves[0].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[0].created_at, self.utcnow)
        self.assertEqual(tokens_moves[0].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[0].transfer, transfer)
        self.assertEqual(tokens_moves[0].state, 'ACTUAL')
        self.assertEqual(tokens_moves[0].direction, 'IN')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[0].investor

        self.assertEqual(tokens_moves[1].investor_id, sender_account)
        self.assertEqual(tokens_moves[1].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[1].created_at, self.utcnow)
        self.assertEqual(tokens_moves[1].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[1].transfer, transfer)
        self.assertEqual(tokens_moves[1].state, 'ACTUAL')
        self.assertEqual(tokens_moves[1].direction, 'OUT')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[1].investor

    def test_actualize_prepared_tokens_move(self):
        receipt_account = self.eth_tester.get_accounts()[0]
        recepient = InvestorFactory.create(eth_account=receipt_account)

        txn_hash = self.mint_tokens(receipt_account, 94735)

        transfer = TransferFactory(txn_hash=txn_hash, state='PREAPARED', to_account=None,
                                   from_account=None, block_hash=None, block_number=None,
                                   actualized_at=None)
        tokens_move = TokensMoveFactory(amount=Decimal('94735'), transfer=transfer, investor=recepient,
                                        state='PREPARED', direction='IN', actualized_at=None)

        event = self.get_transfer_event(txn_hash)
        result = ProcessTransfer()(event)

        self.assertTrue(isinstance(result, Right))

        recepient.refresh_from_db()
        self.assertEqual(recepient.tokens_amount, Decimal('94735'))

        transfer.refresh_from_db()
        self.assertEqual(Transfer.objects.count(), 1)
        self.assertEqual(Transfer.objects.first(), transfer)
        self.assertEqual(transfer.txn_hash, txn_hash)
        self.assertEqual(transfer.to_account, receipt_account)
        self.assertEqual(transfer.from_account, '0x0000000000000000000000000000000000000000')
        self.assertEqual(transfer.amount, Decimal('94735'))
        self.assertEqual(transfer.block_hash, self.eth_tester.get_transaction_by_hash(txn_hash)['block_hash'])
        self.assertEqual(transfer.block_number, self.eth_tester.get_transaction_by_hash(txn_hash)['block_number'])
        self.assertEqual(transfer.created_at, self.utcnow)
        self.assertEqual(transfer.actualized_at, self.utcnow)
        self.assertEqual(transfer.state, 'ACTUAL')

        tokens_move.refresh_from_db()
        self.assertEqual(TokensMove.objects.count(), 2)
        self.assertEqual(TokensMove.objects.filter(direction='IN').first(), tokens_move)
        self.assertEqual(tokens_move.investor, recepient)
        self.assertEqual(tokens_move.amount, Decimal('94735'))
        self.assertEqual(tokens_move.created_at, self.utcnow)
        self.assertEqual(tokens_move.actualized_at, self.utcnow)
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'ACTUAL')
        self.assertEqual(tokens_move.direction, 'IN')
