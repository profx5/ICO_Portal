from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import DatabaseError

from ico_portal.utils.service_object import service_call, ServiceObject


class ChangePassword(ServiceObject):
    def check_old_password(self, context):
        if context.investor.check_password(context.old_password):
            return self.success()
        else:
            return self.fail('password_incorrect')

    def check_new_password(self, context):
        if (context.new_password1 and context.new_password2) and \
           context.new_password1 == context.new_password2:
            if context.old_password == context.new_password2:
                return self.fail('same_password')
            try:
                validate_password(context.new_password2, context.investor)

                return self.success()
            except ValidationError as e:
                return self.fail('invalid_password')

        return self.fail('password_mismatch')

    def set_password(self, context):
        investor = context.investor

        try:
            investor.set_password(context.new_password2)
            investor.save()

            return self.success()
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, investor, old_password, new_password1, new_password2):
        return self.success(investor=investor, old_password=old_password,
                            new_password1=new_password1, new_password2=new_password2) | \
                            self.check_old_password | \
                            self.check_new_password | \
                            self.set_password
