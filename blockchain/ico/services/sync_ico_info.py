from oslash import Left, Right
from django.db import DatabaseError
from blockchain.ico.contracts import PriceContract, TokenContract
from decimal import Decimal

from user_office.models import ICO_Info


class SyncICOInfo:
    def get_total_supply(self, args):
        token = TokenContract()

        return token.get_total_supply() | (lambda ts: Right(dict(args, total_supply=ts)))

    def get_usdc_eth_price(self, args):
        price = PriceContract()

        return price.get_price_USDc_ETH() | (lambda p: Right(dict(args, usd_c_eth_price=p)))


    def get_contracts_data(self, args):
        return self.get_total_supply(args) | self.get_usdc_eth_price


    def build_object(self, args):
        total_supply = Decimal(args['total_supply']) / 10 ** 18

        ico_info = ICO_Info(total_supply=args['total_supply'],
                            usd_c_per_eth=args['usd_c_eth_price'])

        return Right(dict(args, ico_info=ico_info))

    def save_object(self, args):
        try:
            args['ico_info'].save()

            return Right(args)
        except (DatabaseError, ValueError) as e:
            return Left(f'Error while saving ico info {e}')

    def __call__(self):
        return self.get_contracts_data({}) | self.build_object | self.save_object
