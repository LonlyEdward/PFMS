from django.contrib import admin
from django.urls import include, path
from base import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    # path('api-auth/', include('rest_framework.urls')),
]
