from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from rest_framework.documentation import include_docs_urls

from landing import views as landing_views
from user_office import views as user_office_views
from user_office.api_urls import api_urlpatterns


urlpatterns = [
    path('', landing_views.main),
    path('', include('social_django.urls', namespace='social')),
    path('', include('blockchain.urls', namespace='blockchain')),

    re_path(r'^user_office/.*', user_office_views.user_office, name='user_office'),
    path('api/', include(api_urlpatterns)),

    path('support/', include('helpdesk.urls')),
    path('admin/', admin.site.urls),

    path('login/', user_office_views.login, name='login'),
    path('signup/', user_office_views.signup, name='signup'),
    path('logout/', user_office_views.logout, name='logout'),
    path('email_validation/', TemplateView.as_view(template_name='authentication/email_validation.html')),
    path(r'password_reset/', user_office_views.password_reset_form, name='password_reset'),
    path(r'password_reset/done/', user_office_views.password_reset_done, name='password_reset_done'),
    re_path(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            user_office_views.password_reset_confirm, name='password_reset_confirm'),
    path('reset/done/', user_office_views.password_reset_complete, name='password_reset_complete'),
    re_path(r'^change_email/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            user_office_views.change_email, name='change_email_confirm'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns.append(
        path('docs/', include_docs_urls(title='User office API docs', public=False))
    )
