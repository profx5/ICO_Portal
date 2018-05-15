import json
from datetime import datetime

from user_office.factories import TokensMoveFactory, PaymentFactory
from .base import APITestCase


class TestGetTokensMoves(APITestCase):
    def test_tokens_moves_serialization(self):
        utcnow = datetime(2018, 5, 14, 11, 11, 11)
        self.stub_datetime_utcnow(utcnow)

        investor = self.get_investor()

        tokens_move_1 = TokensMoveFactory(investor=investor,
                                          amount=123441,
                                          transfer__txn_hash='0x3c45134db6764ceaaf4879f71be6586d59831949be460b8f6d6e479a8acd0e9a',
                                          transfer__block_number=112312313,
                                          direction='IN')
        tokens_move_1 = TokensMoveFactory(investor=investor,
                                          amount=990122,
                                          transfer__txn_hash='0x7792b9bee82ef5e05c38858ba303d6199801c5dc362343752d847bca39fe38e4',
                                          transfer__block_number=112312343,
                                          direction='OUT')

        payment_1 = PaymentFactory(tokens_move=tokens_move_1,
                                   currency='ETH',
                                   payer_account='pNNnjXDEBOgsGslvWOPh',
                                   amount=842003,
                                   amounti=84200300000000000,
                                   txn_id='0x3990a1ef43a957dfa6cf6bd450419369cf55d4')

        response = self.client.get('/api/getTokensMoves/')

        self.assertEqual(response.status_code, 200)

        self.assertEqual(json.dumps(response.data, indent=4),
'''{
    "count": 2,
    "pages": 1,
    "current_page": 1,
    "results": [
        {
            "amount": "123441",
            "created_at": "2018-05-14T11:11:11",
            "actualized_at": "2018-05-14T11:11:11",
            "state": "ACTUAL",
            "transfer": {
                "txn_hash": "0x3c45134db6764ceaaf4879f71be6586d59831949be460b8f6d6e479a8acd0e9a",
                "state": "ACTUAL",
                "block_number": 112312313
            },
            "direction": "IN",
            "payment": []
        },
        {
            "amount": "990122",
            "created_at": "2018-05-14T11:11:11",
            "actualized_at": "2018-05-14T11:11:11",
            "state": "ACTUAL",
            "transfer": {
                "txn_hash": "0x7792b9bee82ef5e05c38858ba303d6199801c5dc362343752d847bca39fe38e4",
                "state": "ACTUAL",
                "block_number": 112312343
            },
            "direction": "OUT",
            "payment": [
                {
                    "currency": "ETH",
                    "payer_account": "pNNnjXDEBOgsGslvWOPh",
                    "amount": "842003.000000000000000000",
                    "amounti": "84200300000000000",
                    "txn_id": "0x3990a1ef43a957dfa6cf6bd450419369cf55d4",
                    "received_at": "2018-05-14T11:11:11"
                }
            ]
        }
    ]
}''')
