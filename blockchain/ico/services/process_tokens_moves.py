from django.db import DatabaseError
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.conf import settings

from user_office.models import Investor, TokensMove
from user_office import services
from ico_portal.utils.service_object import ServiceObject, service_call


class _Base(ServiceObject):
    def create_or_update_tokens_move(self, context):
        fields = {
            'investor_id': context.investor_id,
            'amount': context.transfer.amount,
            'transfer': context.transfer,
            'direction': context.direction
        }

        tokens_move = TokensMove.objects.filter(investor_id=context.investor_id,
                                                transfer=context.transfer,
                                                direction=context.direction)

        if tokens_move.exists():
            tokens_move = tokens_move.first()

            if tokens_move.actual:
                return self.fail(f'Found TokensMove with id={tokens_move.id} is already actual')

            for k, v in fields.items():
                setattr(tokens_move, k, v)
        else:
            tokens_move = TokensMove(**fields)

        tokens_move.actualize()

        try:
            tokens_move.save()

            return self.success(tokens_move=tokens_move)
        except DatabaseError as e:
            return self.fail(e)

    def recalc_tokens_balance(self, context):
        investor = Investor.objects.select_for_update()\
                                   .filter(eth_account=context.investor_id).first()

        if investor:
            return services.RecalcBalance()(investor) | (lambda _: self.success())
        else:
            return self.success()


class ProcessIncomingTokensMove(_Base):
    @staticmethod
    def send_incoming_tokens_email(investor, incoming_amount, transfer):
        ctx = {
            'investor': investor,
            'incoming_amount': float(incoming_amount) / 10 ** settings.TOKEN_DECIMALS,
            'txn_hash': transfer.txn_hash
        }
        html_content = render_to_string('mail/token_incoming.html', ctx)
        text_content = strip_tags(html_content)

        send_mail('Incoming tokens', text_content,
                  settings.DEFAULT_FROM_EMAIL, [investor.email], fail_silently=False, html_message=html_content)

    def recalc_tokens_balance_and_mail(self, context):
        investor = Investor.objects.select_for_update()\
                                   .filter(eth_account=context.investor_id).first()

        if investor:
            result = services.RecalcBalance()(investor)
            self.send_incoming_tokens_email(investor, result.value.incoming_amount, context.transfer)

            return self.success()
        else:
            return self.success()

    @service_call
    def __call__(self, transfer):
        return self.success(transfer=transfer, investor_id=transfer.to_account, direction='IN') | \
            self.create_or_update_tokens_move | \
            self.recalc_tokens_balance_and_mail


class ProcessOutgoingTokensMove(_Base):
    @service_call
    def __call__(self, transfer):
        return self.success(transfer=transfer, investor_id=transfer.from_account, direction='OUT') | \
                      self.create_or_update_tokens_move | \
                      self.recalc_tokens_balance
