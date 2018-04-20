from django.db.models import Sum
from oslash import Right, Left

from user_office.models import Deposit


class RecalcBalance:
    def calculate_amount(self, investor):
        amount = Deposit.objects.filter(investor=investor,
                                        state='CONFIRMED') \
                                .aggregate(amount=Sum('amount'))['amount']
        return Right({'investor': investor,
                      'amount': amount})

    def set_amount(self, args):
        args['investor'].tokens_amount = args['amount']

        return Right(args)

    def save_investor(self, args):
        args['investor'].save()

        return Right(args)

    def __call__(self, investor):
        return self.calculate_amount(investor) | \
            self.set_amount | \
            self.save_investor
