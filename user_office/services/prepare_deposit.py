# from oslash import Left, Right
# from django.db import DatabaseError

# from user_office.models import Transfer, Deposit
# from blockchain.currencies.ethereum.settings import Settings
# from blockchain.currencies.ethereum.services.calc_tokens_amount import CalcTokensAmount

# class PrepareDeposit:
#     def calc_amount(self, args):
#         return CalcTokensAmount()(args['value']) | (lambda r: \
#             Right(dict(args, amount=r[0], amount_wo_bonus=r[1])))

#     def create_transfer(self, args):
#         mint = Transfer(currency='ETH',
#                         txn_hash=args['txn_hash'],
#                         value=args['value'],
#                         account_to=Settings().token_address,
#                         account_from=args['investor'].eth_account,
#                         state='PREPARED')

#         try:
#             mint.save()

#             return Right(dict(args, mint=mint))
#         except (DatabaseError, ValueError) as e:
#             return Left(f'Error while saving mint {e}')

#     def create_deposit(self, args):
#         deposit = Deposit(investor=args['investor'],
#                           amount=args['amount'],)
#                           # amount_wo_bonus=args['amount_wo_bonus'])

#         try:
#             deposit.save()

#             return Right(dict(args, deposit=deposit))
#         except (DatabaseError, ValueError) as e:
#             return Left(f'Error while saving mint {e}')

#     def __call__(self, investor, value, txn_hash):
#         return Right({'value': value,
#                       'txn_hash': txn_hash,
#                       'investor': investor}) | \
#                       self.calc_amount | \
#                       self.create_deposit | \
#                       self.create_transfer

class PrepareDeposit:
    pass
