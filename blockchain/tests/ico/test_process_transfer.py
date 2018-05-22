from oslash import Right
from decimal import Decimal

from ico_portal.utils.datetime import datetime
from ..base import BlockChainTestCase
from user_office.factories import *
from user_office.models import Transfer, TokensMove, Payment, Investor
from blockchain.ico.contracts.token import TokenContract, TransferEvent
from blockchain.ico.services import ProcessTransfer


class TestProcessTransfer(BlockChainTestCase):
    def setUp(self):
        self.utcnow = datetime.utcnow()
        self.stub_datetime_utcnow(self.utcnow)

    def get_transfer_event_by_receipt(self, txn_hash):
        receipt = TokenContract.web3.eth.getTransactionReceipt(txn_hash)
        raw_event = TokenContract.contract.events.Transfer().processReceipt(receipt)[0]

        return TransferEvent(raw_event)

    def test_purchase_tokens(self):
        recepient_account = '0xB0a3f48478d84a497f930d8455711d9981B66a70'
        recepient = InvestorFactory.create(eth_account=recepient_account)

        txn_hash = '0x3528ca76a93a02edd1f0b4aace3e45e63cd3d3ff277870e8d661a798a71f85e8'
        event = self.get_transfer_event_by_receipt(txn_hash)

        processor = ProcessTransfer()
        result = processor(event)

        self.assertTrue(isinstance(result, Right))

        recepient.refresh_from_db()
        self.assertEqual(recepient.tokens_amount, Decimal('94735'))

        self.assertEqual(Transfer.objects.count(), 1)
        transfer = Transfer.objects.first()
        self.assertEqual(transfer.txn_hash, txn_hash)
        self.assertEqual(transfer.account_to, '0xB0a3f48478d84a497f930d8455711d9981B66a70')
        self.assertEqual(transfer.account_from, '0x0000000000000000000000000000000000000000')
        self.assertEqual(transfer.amount, Decimal('94735'))
        self.assertEqual(transfer.block_hash, '0x6d7cff1b792eb4089ed30c87064c1bcb11b0608c94734727f9ff6bfa828d75b8')
        self.assertEqual(transfer.block_number, 2224221)
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
        sender = InvestorFactory(eth_account='0xB0a3f48478d84a497f930d8455711d9981B66a70')
        recepient = InvestorFactory(eth_account='0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e')

        TokensMoveFactory(investor=sender, amount='90000')

        txn_hash = '0xd04dff3daa89a5898793cd426e95e2ed39d1cccc19e1213e815aca97a0d9c0f0'
        event = self.get_transfer_event_by_receipt(txn_hash)

        processor = ProcessTransfer()
        result = processor(event)

        self.assertTrue(isinstance(result, Right))

        recepient.refresh_from_db()
        self.assertEqual(recepient.tokens_amount, Decimal('90000'))

        sender.refresh_from_db()
        self.assertEqual(sender.tokens_amount, Decimal('0'))

        self.assertEqual(Transfer.objects.count(), 2)
        transfer = Transfer.objects.last()
        self.assertEqual(transfer.txn_hash, txn_hash)

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
        sender_account = '0xB0a3f48478d84a497f930d8455711d9981B66a70'
        sender = InvestorFactory(eth_account='0xB0a3f48478d84a497f930d8455711d9981B66a70')

        TokensMoveFactory(investor=sender, amount='90000')

        txn_hash = '0xd04dff3daa89a5898793cd426e95e2ed39d1cccc19e1213e815aca97a0d9c0f0'
        event = self.get_transfer_event_by_receipt(txn_hash)

        processor = ProcessTransfer()

        result = processor(event)

        self.assertTrue(isinstance(result, Right))

        sender.refresh_from_db()
        self.assertEqual(sender.tokens_amount, Decimal('0'))

        self.assertEqual(Transfer.objects.count(), 2)
        transfer = Transfer.objects.last()
        self.assertEqual(transfer.txn_hash, txn_hash)

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 3)

        self.assertEqual(tokens_moves[1].investor_id, '0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e')
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
        txn_hash = '0xd04dff3daa89a5898793cd426e95e2ed39d1cccc19e1213e815aca97a0d9c0f0'
        event = self.get_transfer_event_by_receipt(txn_hash)

        processor = ProcessTransfer()
        result = processor(event)

        self.assertIsInstance(result, Right)

        self.assertEqual(Transfer.objects.count(), 1)
        transfer = Transfer.objects.last()
        self.assertEqual(transfer.txn_hash, txn_hash)

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 2)

        self.assertEqual(tokens_moves[0].investor_id, '0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e')
        self.assertEqual(tokens_moves[0].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[0].created_at, self.utcnow)
        self.assertEqual(tokens_moves[0].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[0].transfer, transfer)
        self.assertEqual(tokens_moves[0].state, 'ACTUAL')
        self.assertEqual(tokens_moves[0].direction, 'IN')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[0].investor

        self.assertEqual(tokens_moves[1].investor_id, '0xB0a3f48478d84a497f930d8455711d9981B66a70')
        self.assertEqual(tokens_moves[1].amount, Decimal('90000'))
        self.assertEqual(tokens_moves[1].created_at, self.utcnow)
        self.assertEqual(tokens_moves[1].actualized_at, self.utcnow)
        self.assertEqual(tokens_moves[1].transfer, transfer)
        self.assertEqual(tokens_moves[1].state, 'ACTUAL')
        self.assertEqual(tokens_moves[1].direction, 'OUT')
        with self.assertRaises(Investor.DoesNotExist):
            tokens_moves[1].investor

    def test_actualize_prepared_tokens_move(self):
        txn_hash = '0x3528ca76a93a02edd1f0b4aace3e45e63cd3d3ff277870e8d661a798a71f85e8'

        recepient = InvestorFactory.create(eth_account='0xB0a3f48478d84a497f930d8455711d9981B66a70')
        transfer = TransferFactory(txn_hash=txn_hash, state='preapared', account_to=None,
                                   account_from=None, block_hash=None, block_number=None,
                                   actualized_at=None)
        tokens_move = TokensMoveFactory(amount=Decimal('94735'), transfer=transfer, investor=recepient,
                                        state='PREPARED', direction='IN', actualized_at=None)

        event = self.get_transfer_event_by_receipt(txn_hash)
        processor = ProcessTransfer()
        result = processor(event)

        self.assertTrue(isinstance(result, Right))

        recepient.refresh_from_db()
        self.assertEqual(recepient.tokens_amount, Decimal('94735'))

        transfer.refresh_from_db()
        self.assertEqual(Transfer.objects.count(), 1)
        self.assertEqual(Transfer.objects.first(), transfer)
        self.assertEqual(transfer.txn_hash, txn_hash)
        self.assertEqual(transfer.account_to, '0xB0a3f48478d84a497f930d8455711d9981B66a70')
        self.assertEqual(transfer.account_from, '0x0000000000000000000000000000000000000000')
        self.assertEqual(transfer.amount, Decimal('94735'))
        self.assertEqual(transfer.block_hash, '0x6d7cff1b792eb4089ed30c87064c1bcb11b0608c94734727f9ff6bfa828d75b8')
        self.assertEqual(transfer.block_number, 2224221)
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
