from django.views.generic import TemplateView
from .common import LoginRequiredMixin

class UserOfficeView(LoginRequiredMixin, TemplateView):
    template_name = "user_office.html"

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
