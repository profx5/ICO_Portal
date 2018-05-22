from oslash import Left, Right
from django.db import DatabaseError

from user_office.models import Investor, TokensMove
from user_office.services import RecalcBalance


def create_or_update_tokens_move(args):
    investor_id =  args['investor_id']
    transfer = args['transfer']
    direction = args['direction']

    fields = {
        'investor_id': investor_id,
        'amount': transfer.amount,
        'transfer': transfer,
        'direction': direction
    }

    tokens_move = TokensMove.objects.filter(investor_id=investor_id,
                                            transfer=transfer,
                                            direction=direction)

    if tokens_move.exists():
        tokens_move = tokens_move.first()

        if tokens_move.actual:
                return Left(f'Found TokensMove with id={tokens_move.id} is already actual')

        for k, v in fields.items():
            setattr(tokens_move, k, v)
    else:
        tokens_move = TokensMove(**fields)

    tokens_move.actualize()

    try:
        tokens_move.save()

        return Right(dict(args, tokens_move=tokens_move))
    except DatabaseError as e:
        return Left(f'Error while saving TokensMove, {e}')

def recalc_tokens_balance(args):
    investor = Investor.objects.select_for_update()\
                               .filter(eth_account=args['investor_id']).first()

    if investor:
        service = RecalcBalance()

        return service(investor) | (lambda _: Right(args))
    else:
        return Right(args)


class ProcessIncomingTokensMove:
    def __call__(self, transfer):
        return Right({'transfer': transfer,
                      'investor_id': transfer.account_to,
                      'direction': 'IN'}) | \
                      create_or_update_tokens_move | \
                      recalc_tokens_balance


class ProcessOutgoingTokensMove:
    def __call__(self, transfer):
        return Right({'transfer': transfer,
                      'investor_id': transfer.account_from,
                      'direction': 'OUT'}) | \
                      create_or_update_tokens_move | \
                      recalc_tokens_balance
