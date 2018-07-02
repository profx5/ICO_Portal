from oslash import Right
from decimal import Decimal

from ..base import BlockChainTestCase
from user_office.factories import InvestorFactory, TokensMoveFactory, TransferFactory
from user_office.models import Transfer, TokensMove, Payment, Investor
from blockchain.ico.services import ProcessTransfer, Mint, SendPreparedTxns


class TestProcessTransfer(BlockChainTestCase):
    setup_eth_tester = True

    def test_purchase_tokens(self):
        recepient_account = self.account['address']
        recepient = InvestorFactory.create(eth_account=recepient_account)
        self.pass_KYC(recepient_account)

        txn_hash = self.call_crowsdsale_fallback(recepient_account, int(1.23 * 10 ** 18))  # 1.23 ETH
        event = self.get_transfer_event(txn_hash)

        result = ProcessTransfer()(event)

        self.assertTrue(isinstance(result, Right))

        recepient.refresh_from_db()

        self.assertEqual(recepient.tokens_amount, Decimal('94735'))

        self.assertEqual(Transfer.objects.count(), 1)
        transfer = Transfer.objects.first()
        self.assertEqual(transfer.txn_hash, txn_hash)
        self.assertEqual(transfer.to_account, recepient_account)
        self.assertEqual(transfer.from_account, '0x0000000000000000000000000000000000000000')
        self.assertEqual(transfer.amount, Decimal('94735'))
        self.assertEqual(transfer.block_hash, self.eth_tester.get_transaction_by_hash(txn_hash)['block_hash'])
        self.assertEqual(transfer.block_number, self.eth_tester.get_transaction_by_hash(txn_hash)['block_number'])
        self.assertEqual(transfer.created_at, self.utcnow)
        self.assertEqual(transfer.actualized_at, self.utcnow)
        self.assertEqual(transfer.state, 'ACTUAL')

        self.assertEqual(TokensMove.objects.count(), 1)
        tokens_move = TokensMove.objects.first()
        self.assertEqual(tokens_move.investor, recepient)
        self.assertEqual(tokens_move.investor_id, recepient_account)
        self.assertEqual(tokens_move.amount, Decimal('94735'))
        self.assertEqual(tokens_move.created_at, self.utcnow)
        self.assertEqual(tokens_move.actualized_at, self.utcnow)
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'ACTUAL')
        self.assertEqual(tokens_move.direction, 'IN')

        self.assertEqual(Payment.objects.count(), 1)
        payment = Payment.objects.first()
        self.assertEqual(payment.currency, 'ETH')
        self.assertEqual(payment.payer_account, recepient.eth_account)
        self.assertEqual(payment.amount, Decimal('1.23'))
        self.assertEqual(payment.amounti, Decimal('1230000000000000000'))
        self.assertEqual(payment.txn_id, txn_hash)
        self.assertEqual(payment.tokens_move, tokens_move)

    def test_transfer_tokens_to_existing_account(self):
        sender_account = self.account['address']
        sender = InvestorFactory(eth_account=sender_account)
        recepient_account = self.eth_tester.get_accounts()[0]
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
        self.assertEqual(tokens_moves.count(), 3)

        self.assertEqual(tokens_moves[1].investor, recepient)
        self.assertEqual(tokens_moves[1].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[1].created_at, self.utcnow)
        self.assertEqual(tokens_moves[1].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[1].transfer, transfer)
        self.assertEqual(tokens_moves[1].state, 'ACTUAL')
        self.assertEqual(tokens_moves[1].direction, 'IN')

        self.assertEqual(tokens_moves[2].investor, sender)
        self.assertEqual(tokens_moves[2].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[2].created_at, self.utcnow)
        self.assertEqual(tokens_moves[2].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[2].transfer, transfer)
        self.assertEqual(tokens_moves[2].state, 'ACTUAL')
        self.assertEqual(tokens_moves[2].direction, 'OUT')

    def test_transfer_tokens_to_nonexisting_account(self):
        sender_account = self.account['address']
        sender = InvestorFactory(eth_account=sender_account)
        recepient_account = self.eth_tester.get_accounts()[0]

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

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 3)

        self.assertEqual(tokens_moves[1].investor_id, recepient_account)
        self.assertEqual(tokens_moves[1].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[1].created_at, self.utcnow)
        self.assertEqual(tokens_moves[1].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[1].transfer, transfer)
        self.assertEqual(tokens_moves[1].state, 'ACTUAL')
        self.assertEqual(tokens_moves[1].direction, 'IN')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[1].investor

        self.assertEqual(tokens_moves[2].investor, sender)
        self.assertEqual(tokens_moves[2].investor_id, sender_account)
        self.assertEqual(tokens_moves[2].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[2].created_at, self.utcnow)
        self.assertEqual(tokens_moves[2].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[2].transfer, transfer)
        self.assertEqual(tokens_moves[2].state, 'ACTUAL')
        self.assertEqual(tokens_moves[2].direction, 'OUT')

    def test_transfer_between_nonexisting_accounts(self):
        sender_account = self.account['address']
        recepient_account = self.eth_tester.get_accounts()[0]

        mint_txn_hash = self.mint_tokens(sender_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(mint_txn_hash))
        self.assertIsInstance(result, Right)

        transfer_txn_hash = self.transfer_tokens(sender_account, recepient_account, 90000)
        result = ProcessTransfer()(self.get_transfer_event(transfer_txn_hash))
        self.assertIsInstance(result, Right)

        self.assertEqual(Transfer.objects.count(), 2)
        transfer = Transfer.objects.last()
        self.assertEqual(transfer.txn_hash, transfer_txn_hash)

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 3)

        self.assertEqual(tokens_moves[1].investor_id, recepient_account)
        self.assertEqual(tokens_moves[1].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[1].created_at, self.utcnow)
        self.assertEqual(tokens_moves[1].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[1].transfer, transfer)
        self.assertEqual(tokens_moves[1].state, 'ACTUAL')
        self.assertEqual(tokens_moves[1].direction, 'IN')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[1].investor

        self.assertEqual(tokens_moves[2].investor_id, sender_account)
        self.assertEqual(tokens_moves[2].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[2].created_at, self.utcnow)
        self.assertEqual(tokens_moves[2].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[2].transfer, transfer)
        self.assertEqual(tokens_moves[2].state, 'ACTUAL')
        self.assertEqual(tokens_moves[2].direction, 'OUT')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[2].investor

    def test_actualize_prepared_tokens_move(self):
        receipt_account = self.account['address']
        recepient = InvestorFactory.create(eth_account=receipt_account)

        txn_hash = self.mint_tokens(receipt_account, 94735)

        transfer = TransferFactory(txn_hash=txn_hash, state='PREAPARED', to_account=None,
                                   from_account=None, block_hash=None, block_number=None,
                                   actualized_at=None)
        tokens_move = TokensMoveFactory(amount=Decimal('94735'), transfer=transfer, investor=recepient,
                                        state='PREPARED', direction='IN', actualized_at=None)

        event = self.get_transfer_event(txn_hash)
        processor = ProcessTransfer()
        result = processor(event)

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
        self.assertEqual(TokensMove.objects.count(), 1)
        self.assertEqual(TokensMove.objects.first(), tokens_move)
        self.assertEqual(tokens_move.investor, recepient)
        self.assertEqual(tokens_move.amount, Decimal('94735'))
        self.assertEqual(tokens_move.created_at, self.utcnow)
        self.assertEqual(tokens_move.actualized_at, self.utcnow)
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'ACTUAL')
        self.assertEqual(tokens_move.direction, 'IN')

    def test_find_transfer_by_txn_id(self):
        receipt_account = self.account['address']
        recepient = InvestorFactory.create(eth_account=receipt_account)

        txn_id = Mint()(receipt_account, 90000).value
        transfer = TransferFactory(txn_hash=None, state='PREAPARED', to_account=None,
                                   from_account=None, block_hash=None, block_number=None,
                                   actualized_at=None, mint_txn_id=txn_id)
        tokens_move = TokensMoveFactory(amount=Decimal('90000'), transfer=transfer, investor=recepient,
                                        state='PREPARED', direction='IN', actualized_at=None)

        result = SendPreparedTxns()()
        self.assertEqual(len(result), 1)
        self.assertIsInstance(result[0], Right)
        txn_hash = result[0].value['txn_object'].txn_hash
        result = ProcessTransfer()(self.get_transfer_event(txn_hash))

        self.assertTrue(isinstance(result, Right))

        recepient.refresh_from_db()
        self.assertEqual(recepient.tokens_amount, Decimal('90000'))

        transfer.refresh_from_db()
        self.assertEqual(Transfer.objects.count(), 1)
        self.assertEqual(Transfer.objects.first(), transfer)
        self.assertEqual(transfer.txn_hash, txn_hash)
        self.assertEqual(transfer.to_account, receipt_account)
        self.assertEqual(transfer.from_account, '0x0000000000000000000000000000000000000000')
        self.assertEqual(transfer.amount, Decimal('90000'))
        self.assertEqual(transfer.block_hash, self.eth_tester.get_transaction_by_hash(txn_hash)['block_hash'])
        self.assertEqual(transfer.block_number, self.eth_tester.get_transaction_by_hash(txn_hash)['block_number'])
        self.assertEqual(transfer.created_at, self.utcnow)
        self.assertEqual(transfer.actualized_at, self.utcnow)
        self.assertEqual(transfer.state, 'ACTUAL')

        tokens_move.refresh_from_db()
        self.assertEqual(TokensMove.objects.count(), 1)
        self.assertEqual(TokensMove.objects.first(), tokens_move)
        self.assertEqual(tokens_move.investor, recepient)
        self.assertEqual(tokens_move.amount, Decimal('90000'))
        self.assertEqual(tokens_move.created_at, self.utcnow)
        self.assertEqual(tokens_move.actualized_at, self.utcnow)
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'ACTUAL')
        self.assertEqual(tokens_move.direction, 'IN')
