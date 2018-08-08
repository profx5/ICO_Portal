import requests
from django.conf import settings
from oslash import Left

from ico_portal.utils.service_object import ServiceObject, service_call


class InvalidRECAPTCHAResponse(Left):
    def bind(self, func):
        return InvalidRECAPTCHAResponse(self._get_value())


class CheckRECAPTCHA(ServiceObject):
    def send_request(self, context):
        response = requests.post('https://www.google.com/recaptcha/api/siteverify', data={
            'secret': settings.RECAPTCHA_SECRET,
            'response': context.recaptcha_response
        })

        return self.success(response=response)

    def check_response(self, context):
        data = context.response.json()

        if data['success']:
            return self.success()
        else:
            self.fail_with(InvalidRECAPTCHAResponse(data))

    @service_call
    def __call__(self, recaptcha_response):
        return self.success(recaptcha_response=recaptcha_response) | \
            self.send_request | \
            self.check_response
