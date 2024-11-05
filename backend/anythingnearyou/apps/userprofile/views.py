from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from .models import Profile
from .serializers import ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.select_related('user').all()
    serializer_class = ProfileSerializer

    # def perform_create(self, serializer):
    #     if Profile.objects.filter(user=self.request.user).exists():
    #         raise ValidationError("User already has a profile")
    #     serializer.save(user=self.request.user)

    # @action(detail=False, methods=['get'])
    # def my_profile(self, request):
    #     profile = get_object_or_404(Profile, user=request.user)
    #     serializer = self.get_serializer(profile)
    #     return Response(serializer.data)

    # @action(detail=False, methods=['get'])
    # def by_institution(self, request):
    #     institution = request.query_params.get('institution', None)
    #     if institution is None:
    #         return Response(
    #             {"error": "Institution parameter is required"},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )
        
        # profiles = self.queryset.filter(institution__icontains=institution)
        # serializer = self.get_serializer(profiles, many=True)
        # return Response(serializer.data)