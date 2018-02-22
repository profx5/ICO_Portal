from django.views.generic import TemplateView
from .mixins import LoginRequiredMixin

class UserOfficeView(LoginRequiredMixin, TemplateView):
    template_name = "user_office.html"

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
