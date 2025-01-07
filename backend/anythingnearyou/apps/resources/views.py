from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from .models import Resource
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ResourceSerializer
from rest_framework.parsers import FileUploadParser
from ..user.models import User
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet


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
    
    @action(detail=False, methods=['delete'], url_path='owner/(?P<user_id>[^/.]+)/resource/(?P<resource_id>[^/.]+)')
    def delete_resource(self, request, user_id=None, resource_id=None):
        """
        Delete a specific resource by its resource_id for a specific user.
        """
        try:
            # Fetch the resource with the given resource_id and user_id
            resource = Resource.objects.get(owner_id=user_id, resource_id=resource_id)

            # Trigger custom delete logic
            resource.delete()

            return Response(
                {"message": f"Resource with ID {resource_id} has been deleted successfully."},
                status=status.HTTP_204_NO_CONTENT
            )
        except Resource.DoesNotExist:
            return Response(
                {"message": "Resource not found for the given user ID and resource ID."},
                status=status.HTTP_404_NOT_FOUND
            )


class ResourceViewSet(ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    @action(detail=True, methods=['patch'], url_path='owner/(?P<user_id>[^/.]+)/resource/(?P<resource_id>[^/.]+)')
    def partial_update_resource(self, request, user_id=None, resource_id=None):
        try:
            resource = Resource.objects.get(owner_id=user_id, resource_id=resource_id)
        except Resource.DoesNotExist:
            return Response(
                {"message": "Resource not found for the given user ID and resource ID."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Update fields if provided in the request
        if 'title' in request.data:
            resource.title = request.data['title']
        if 'description' in request.data:
            resource.description = request.data['description']
        if 'price' in request.data:
            resource.price = request.data['price']
        if 'condition' in request.data:
            resource.condition = request.data['condition']
        if 'is_available' in request.data:
            resource.is_available = request.data['is_available']
        if 'is_negotiable' in request.data:
            resource.is_negotiable = request.data['is_negotiable']
        if 'location' in request.data:
            resource.location = request.data['location']
        
        # Handle file upload
        if request.FILES.get('photo'):
            resource.photo = request.FILES['photo']

        # Save the updated resource
        resource.save()

        return Response(
            {"message": f"Resource {resource_id} updated successfully."},
            status=status.HTTP_200_OK
        )