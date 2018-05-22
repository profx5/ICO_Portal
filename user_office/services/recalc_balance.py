from django.db.models import Sum
from oslash import Right, Left
from django.db import DatabaseError

from user_office.models import TokensMove


class RecalcBalance:
    def calculate_incoming_amount(self, args):
        result = TokensMove.objects.filter(investor=args['investor'],
                                           state='ACTUAL',
                                           direction='IN') \
                                   .aggregate(amount=Sum('amount'))

        if result['amount']:
            return Right(dict(args, incoming_amount=result['amount']))
        else:
            return Right(dict(args, incoming_amount=0))

    def calculate_outgoing_amount(self, args):
        result = TokensMove.objects.filter(investor=args['investor'],
                                           state='ACTUAL',
                                           direction='OUT') \
                                   .aggregate(amount=Sum('amount'))

        if result['amount']:
            return Right(dict(args, outgoing_amount=result['amount']))
        else:
            return Right(dict(args, outgoing_amount=0))

    def set_amount(self, args):
        args['investor'].tokens_amount = args['incoming_amount'] - args['outgoing_amount']

        return Right(args)

    def save_investor(self, args):
        try:
            args['investor'].save()

            return Right(args)
        except DatabaseError as e:
            return Left(f'Error while saving investor {e}')

    def __call__(self, investor):
        return Right({'investor': investor}) | \
            self.calculate_incoming_amount | \
            self.calculate_outgoing_amount | \
            self.set_amount | \
            self.save_investor
