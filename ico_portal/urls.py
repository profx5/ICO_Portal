from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from landing import views as landing_views
from user_office import views as user_office_views
from user_office.api_urls import api_urlpatterns
from django.views.generic.base import TemplateView

from rest_framework.documentation import include_docs_urls


urlpatterns = [
    path('', landing_views.main),
    path('login/', user_office_views.login, name='login'),
    path('signup/', user_office_views.signup, name='signup'),
    path('logout/', user_office_views.logout, name='logout'),
    path('email_validation/', TemplateView.as_view(template_name='authentication/email_validation.html')),
    path('user_office/', user_office_views.user_office, name='user_office'),
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    path('', include('social_django.urls', namespace='social')),
    path('docs/', include_docs_urls(title='User office API docs', public=False))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
