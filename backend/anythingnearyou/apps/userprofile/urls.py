# apps/userprofile/urls.py
from django.urls import path
from apps.userprofile.views import ProfileViewSet

app_name = 'userprofile'

urlpatterns = [
    path('', ProfileViewSet.as_view({
        'get': 'list',
        # 'post': 'create'
    }), name='profile-list'),
    
]