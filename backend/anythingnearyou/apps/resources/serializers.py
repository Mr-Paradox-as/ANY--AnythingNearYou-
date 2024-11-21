from rest_framework import serializers
from .models import Resource
from ..user.models import User


class ResourceSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.full_name', read_only=True)  # Fetch the owner's full name

    class Meta:
        model = Resource
        fields = '__all__'  # Includes all fields
        extra_fields = ['owner_name']  # Add the custom field
