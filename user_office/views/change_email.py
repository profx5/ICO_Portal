from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.contrib.auth import logout
from oslash import Right

from user_office.services import SetEmail


@require_GET
@login_required
def change_email(request, uidb64, token):
    result = SetEmail()(investor=request.user,
                        uid=uidb64,
                        token=token)

    if isinstance(result, Right):
        logout(request)

        return HttpResponse('Email successfully changed')
    else:
        return HttpResponse('Error while changing email')
