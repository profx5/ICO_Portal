from django.views.generic import TemplateView
from .mixins import LoginRequiredMixin

class UserOfficeView(LoginRequiredMixin, TemplateView):
    login_url = '/login/'
    redirect_field_name = ''
    template_name = "user_office.html"

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
