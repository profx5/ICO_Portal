from django.contrib import admin
from django.urls import path
from landing import views as landing_views
from user_office import views as user_office_views

urlpatterns = [
    path('', landing_views.main),
    path('login/', user_office_views.login),
    path('signup/', user_office_views.signup),
    path('logout/', user_office_views.logout),
    path('user_office/', user_office_views.user_office),
    path('admin/', admin.site.urls),
]
