from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from .models import Resource
from .serializers import ResourceSerializer
from ..user.models import User
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet


class ResourceViewSet(ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class ResourceReadOnlyViewSet(ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    @action(detail=False, methods=['get'], url_path='owner/(?P<user_id>[^/.]+)')
    def resources_by_owner(self, request, user_id=None):
        """
        Custom action to fetch resources by owner (user_id).
        """
        resources = Resource.objects.filter(owner_id=user_id)
        serializer = self.get_serializer(resources, many=True)
        return Response(serializer.data)