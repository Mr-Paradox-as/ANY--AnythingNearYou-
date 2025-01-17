from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/profiles/', include('apps.userprofile.urls')),
    path('api/',include('apps.resources.urls')),
    path('api/users/',include('apps.user.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
