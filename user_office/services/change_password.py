from oslash import Right, Left
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import DatabaseError


class ChangePassword:
    def check_old_password(self, args):
        if args['investor'].check_password(args['old_password']):
            return Right(args)
        else:
            return Left('password_incorrect')

    def check_new_password(self, args):
        old_password = args['old_password']
        password1 = args['new_password1']
        password2 = args['new_password2']

        if (password1 and password2) and password1 == password2:
            if old_password == password2:
                return Left('same_password')

            try:
                validate_password(password2, args['investor'])

                return Right(args)
            except ValidationError as e:
                return Left('invalid_password')

        return Left('password_mismatch')

    def set_password(self, args):
        investor = args['investor']

        try:
            investor.set_password(args['new_password2'])
            investor.save()

            return Right(args)
        except DatabaseError as e:
            return Left(f'Error while saving Investor, {e}')

    def __call__(self, investor, old_password, new_password1, new_password2):
        return Right({'investor': investor,
                      'old_password': old_password,
                      'new_password1': new_password1,
                      'new_password2': new_password2}) | \
                      self.check_old_password | \
                      self.check_new_password | \
                      self.set_password
