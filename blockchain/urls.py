from .currencies import Currencies


app_name = 'blockchain'

urlpatterns = Currencies.get_urls()
