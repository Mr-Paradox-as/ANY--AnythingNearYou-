from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LogoutView,LoginView,RegisterView,UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'allusers', UserViewSet, basename='resource')

urlpatterns = router.urls

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls))
]
