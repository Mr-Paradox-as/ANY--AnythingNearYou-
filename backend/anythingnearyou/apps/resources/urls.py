from rest_framework.routers import DefaultRouter
from .views import ResourceReadOnlyViewSet

router = DefaultRouter()
router.register(r'resources', ResourceReadOnlyViewSet, basename='resources')

urlpatterns = [
    # Other routes
] + router.urls