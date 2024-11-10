from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceSerializer, ResourceListSerializer
from django.db.models import Q

class ResourceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling Resource operations
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'condition', 'is_available']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'posted_date']
    ordering = ['-posted_date']  # Default ordering

    def get_queryset(self):
        """
        Get the list of items for this view.
        Optionally filtered by URL parameters.
        """
        queryset = Resource.objects.select_related('owner').all()
        
        # Price range filter
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price is not None:
            queryset = queryset.filter(price__gte=float(min_price))
        if max_price is not None:
            queryset = queryset.filter(price__lte=float(max_price))

        return queryset

    def get_serializer_class(self):
        """
        Return appropriate serializer class
        """
        if self.action == 'list':
            return ResourceListSerializer
        return ResourceSerializer

    def perform_create(self, serializer):
        """
        Set the owner to the current user when creating a resource
        """
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'])
    def my_resources(self, request):
        """
        Custom endpoint to get current user's resources
        """
        resources = self.get_queryset().filter(owner=request.user)
        serializer = self.get_serializer(resources, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Custom search endpoint with more complex filtering
        """
        query = request.query_params.get('q', '')
        if query:
            resources = self.get_queryset().filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(category__icontains=query) |
                Q(location__icontains=query)
            )
            serializer = self.get_serializer(resources, many=True)
            return Response(serializer.data)
        return Response([])

    def update(self, request, *args, **kwargs):
        """
        Custom update method to handle partial updates
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Only allow owners to update their resources
        if instance.owner != request.user:
            return Response(
                {"detail": "You do not have permission to update this resource."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = self.get_serializer(
            instance, 
            data=request.data, 
            partial=partial,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """
        Custom delete method to ensure only owners can delete their resources
        """
        instance = self.get_object()
        if instance.owner != request.user:
            return Response(
                {"detail": "You do not have permission to delete this resource."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)