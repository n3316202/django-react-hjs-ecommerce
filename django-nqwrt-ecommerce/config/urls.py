from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# dev_10_3_Fruit
from drf_spectacular.views import SpectacularJSONAPIView, SpectacularYAMLAPIView, SpectacularSwaggerView, \
    SpectacularRedocView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("store.urls")),  # dev_1
    path("accounts/", include("accounts.urls")),  # dev_9
    path("cart/", include("cart.urls")),  # dev_15
    path("orders/", include("orders.urls")),  # dev_24
    path("payment/", include("payment.urls")),  # dev_26
    path("api/", include("api.urls")),  # dev_28
    #dev_10_3_Fruit
    path("swagger.json/", SpectacularJSONAPIView.as_view(), name="schema-json"),
    path("swagger.yaml/", SpectacularYAMLAPIView.as_view(), name="swagger-yaml"),
    path("swagger/", SpectacularSwaggerView.as_view(url_name="schema-json"), name="swagger-ui", ),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema-json"), name="redoc", ),
]

# dev_2
# http://127.0.0.1:8000/media/파일경로
# MEDIA_URL = "media/"  # ex) /media/photo1.png
# MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# dev_2
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
