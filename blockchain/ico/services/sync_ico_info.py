from django.db import DatabaseError

from user_office.models import ICO_Info
from blockchain.ico.contracts import CrowdsaleContract
from ico_portal.utils.service_object import ServiceObject, service_call


class SyncICOInfo(ServiceObject):
    def get_total_supply(self, context):
        try:
            total_supply = CrowdsaleContract().get_cents_raised()

            return self.success(total_supply=total_supply)
        except ConnectionError as e:
            return self.fail(e)

    def build_object(self, context):
        ico_info = ICO_Info(total_supply=context.total_supply)

        return self.success(ico_info=ico_info)

    def save_object(self, context):
        try:
            context.ico_info.save()

            return self.success(ico_info=context.ico_info)
        except (DatabaseError, ValueError) as e:
            return self.fail(e)

    @service_call
    def __call__(self):
        return self.success() | \
            self.get_total_supply | \
            self.build_object | \
            self.save_object
