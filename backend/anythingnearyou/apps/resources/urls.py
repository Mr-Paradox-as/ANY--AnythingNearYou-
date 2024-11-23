from rest_framework.routers import DefaultRouter
from .views import ResourceViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'resources', ResourceViewSet, basename='resource')

urlpatterns = router.urls

urlpatterns = [
    path('', include(router.urls)),  # Include the router's URLs
]