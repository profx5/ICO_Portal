from django.contrib import admin
from django.urls import path, include
from landing import views as landing_views
from user_office import views as user_office_views
from user_office.api_urls import api_urlpatterns

from rest_framework.documentation import include_docs_urls


urlpatterns = [
    path('', landing_views.main),
    path('login/', user_office_views.login),
    path('signup/', user_office_views.signup),
    path('logout/', user_office_views.logout),
    path('user_office/', user_office_views.user_office),
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),

    path('docs/', include_docs_urls(title='User office API docs', public=False))
]
