from oslash import Left, Right
from django.db import DatabaseError

from user_office.models import ICO_Info


class SyncICOInfo:
    def get_total_supply(self, args):
        try:
            total_supply = TokenContract().get_total_supply()

            return Right(dict(args, total_supply=total_supply))
        except ConnectionError as e:
            return Left(f'Got connection error while trying get total supply')

    def build_object(self, args):
        ico_info = ICO_Info(total_supply=args['total_supply'])

        return Right(dict(args, ico_info=ico_info))

    def save_object(self, args):
        try:
            args['ico_info'].save()

            return Right(args)
        except (DatabaseError, ValueError) as e:
            return Left(f'Error while saving ico info {e}')

    def __call__(self):
        return Right({}) | \
            self.get_total_supply | \
            self.build_object | \
            self.save_object
