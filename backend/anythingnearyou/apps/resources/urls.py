from rest_framework.routers import DefaultRouter,path
from .views import ResourceReadOnlyViewSet,ResourceViewSet

router = DefaultRouter()
router.register(r'resources', ResourceReadOnlyViewSet, basename='resources')

urlpatterns = [
    path('owner/<int:owner_id>/resource/<int:pk>/', ResourceViewSet.as_view({'put': 'update', 'patch': 'update'})),
] + router.urls