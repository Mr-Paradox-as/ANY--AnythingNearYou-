from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Resource
from .serializers import ResourceSerializer

class ResourceViewSet(ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
