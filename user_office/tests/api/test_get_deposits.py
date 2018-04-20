import json
from datetime import datetime

from .base import APITestCase
from user_office.models import Deposit, Mint


class TestGetDeposits(APITestCase):
    def test_successful_request(self):
        mints = [Mint.objects.create(currency='ETH',
                                     block_hash='0xa72c855a41006709e340d15640c2b18dc6be332fcaa35f09da1d26ccbb042b49',
                                     account_to='0xF69C63e7a39b56b69E09b21496B46005bF950458',
                                     account_from='0x73015966604928A312F79F7E69291a656Cb88602',
                                     value=777777,
                                     txn_date=datetime(2018, 1, 10),
                                     state='CONFIRMED',
                                     confirmation_date=datetime(2018, 1, 11),
                                     block_number=1862339,
                                     txn_hash='0x3c45134db6764ceaaf4879f71be6586d59831949be460b8f6d6e479a8acd0e9a'),
                 Mint.objects.create(currency='ETH',
                                     block_hash='0x2ca3e05ceacfe704db4cb7f7ce1a11aba2f7bd48118a2918a57bc7e202df08ef',
                                     account_to='0xF69C63e7a39b56b69E09b21496B46005bF950458',
                                     account_from='0x73015966604928A312F79F7E69291a656Cb88602',
                                     value=100300,
                                     txn_date=datetime(2018, 2, 10),
                                     state='CONFIRMED',
                                     confirmation_date=datetime(2018, 2, 11),
                                     block_number=1862325,
                                     txn_hash='0x7792b9bee82ef5e05c38858ba303d6199801c5dc362343752d847bca39fe38e4')]

        investor = self.get_investor()

        deposits = [Deposit.objects.create(investor=investor,
                                           amount=1166.6655,
                                           amount_wo_bonus=777.777,
                                           charged_at=datetime(2018, 1, 11),
                                           mint=mints[0],
                                           state='CONFIRMED'),
                    Deposit.objects.create(investor=investor,
                                           amount=150.45,
                                           amount_wo_bonus=100.3,
                                           charged_at=datetime(2018, 2, 11),
                                           mint=mints[1],
                                           state='CONFIRMED')]

        response = self.client.get('/api/getDeposits/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.dumps(response.data, indent=4),
'''{
    "count": 2,
    "pages": 1,
    "current_page": 1,
    "results": [
        {
            "amount": "1166.66550000",
            "amount_wo_bonus": "777.77700000",
            "charged_at": "2018-01-11T00:00:00",
            "state": "CONFIRMED",
            "mint": {
                "txn_hash": "0x3c45134db6764ceaaf4879f71be6586d59831949be460b8f6d6e479a8acd0e9a"
            }
        },
        {
            "amount": "150.45000000",
            "amount_wo_bonus": "100.30000000",
            "charged_at": "2018-02-11T00:00:00",
            "state": "CONFIRMED",
            "mint": {
                "txn_hash": "0x7792b9bee82ef5e05c38858ba303d6199801c5dc362343752d847bca39fe38e4"
            }
        }
    ]
}''')
