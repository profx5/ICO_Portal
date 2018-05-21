from oslash import Left, Right, Nothing, Just

from user_office.models import Investor, TokensMove
from user_office.services import RecalcBalance


class InvestorNotFound(Left):
    def bind(self, func):
        return InvestorNotFound(self._get_value())


def _find_investor(eth_account):
    investor = Investor.objects.select_for_update().filter(eth_account=eth_account).first()

    if investor:
        return Just(investor)
    else:
        return Nothing()

def _create_or_update_tokens_move(transfer, investor, direction):
    fields = {
        'investor': investor,
        'amount': transfer.amount,
        'transfer': transfer,
        'direction': direction
    }

    tokens_move = TokensMove.objects.filter(investor=investor,
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

    tokens_move.save()

    return Right(tokens_move)

def recalc_tokens_balance(args):
    investor = args['investor']

    service = RecalcBalance()

    return service(investor) | (lambda _: Right(args))


class ProcessIncomingTokensMove:
    def find_investor(self, args):
        return _find_investor(args['transfer'].account_to) | \
            (lambda investor: Right(dict(args, investor=investor)))

    def create_or_update_tokens_move(self, args):
        return _create_or_update_tokens_move(args['transfer'], args['investor'], 'IN') | \
            (lambda tokens_move: Right(dict(args, tokens_move=tokens_move)))

    def try_process_payment(self, args):
        return Right(args)

    def __call__(self, transfer):
        return Right({'transfer': transfer}) | \
            self.find_investor | \
            self.create_or_update_tokens_move | \
            self.try_process_payment | \
            recalc_tokens_balance


class ProcessOutgoingTokensMove:
    def find_investor(self, args):
        return _find_investor(args['transfer'].account_from) | \
            (lambda investor: Right(dict(args, investor=investor)))

    def create_or_update_tokens_move(self, args):
        return _create_or_update_tokens_move(args['transfer'], args['investor'], 'OUT') | \
            (lambda tokens_move: Right(dict(args, tokens_move=tokens_move)))

    def __call__(self, transfer):
        return Right({'transfer': transfer}) | \
            self.find_investor | \
            self.create_or_update_tokens_move | \
            recalc_tokens_balance
