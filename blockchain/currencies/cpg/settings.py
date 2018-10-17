from urllib.parse import urljoin
from django.conf import settings
from django.urls import path
from django.http import HttpResponse
from oslash import Right
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from blockchain.currencies.base_settings import BaseSettings
from .services.process_ipn import ProcessIPN, SkipIPN
from .services import GetAccount


class Settings(BaseSettings):
    @property
    def ipn_path(self):
        return f'cpg_ipn/{self.code.lower()}/'

    @property
    def ipn_url(self):
        return urljoin(settings.HOST, self.ipn_path)

    @property
    def urls(self):
        return path(self.ipn_path, self.process_ipn, name='cpg_process_ipn')

    @method_decorator(csrf_exempt)
    def process_ipn(self, request):
        service = ProcessIPN(self)

        result = service(request)

        if isinstance(result, Right) or isinstance(result, SkipIPN):
            return HttpResponse('OK', status=200)
        else:
            return HttpResponse(result.value, status=422)

    def get_pay_address(self, investor):
        result = GetAccount()(investor, self)

        if isinstance(result, Right):
            return Right(result.value.account.address)
        else:
            return result
