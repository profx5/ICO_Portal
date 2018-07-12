from django.db.models import Sum
from django.db import DatabaseError

from user_office.models import TokensMove
from ico_portal.utils.service_object import ServiceObject, service_call


class RecalcBalance(ServiceObject):
    def calculate_incoming_amount(self, context):
        result = TokensMove.objects.filter(investor=context.investor,
                                           state='ACTUAL',
                                           direction='IN') \
                                   .aggregate(amount=Sum('amount'))

        if result['amount']:
            return self.success(incoming_amount=result['amount'])
        else:
            return self.success(incoming_amount=0)

    def calculate_outgoing_amount(self, context):
        result = TokensMove.objects.filter(investor=context.investor,
                                           state='ACTUAL',
                                           direction='OUT') \
                                   .aggregate(amount=Sum('amount'))

        if result['amount']:
            return self.success(outgoing_amount=result['amount'])
        else:
            return self.success(outgoing_amount=0)

    def set_amount(self, context):
        context.investor.tokens_amount = context.incoming_amount - context.outgoing_amount

        try:
            context.investor.save()

            return self.success(investor=context.investor)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, investor):
        return self.success(investor=investor) | \
            self.calculate_incoming_amount | \
            self.calculate_outgoing_amount | \
            self.set_amount
