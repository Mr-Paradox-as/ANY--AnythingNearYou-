from rest_framework import serializers
from .models import Resource
from ..user.models import User
from ..userprofile.serializers import UserSerializer  # Assuming you have a UserSerializer

class ResourceSerializer(serializers.ModelSerializer):
    """
    Basic serializer for Resource model
    """
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(
        source='owner',
        write_only=True,
        queryset=User.objects.all()
    )
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Resource
        fields = [
            'resource_id',
            'owner',
            'owner_id',
            'title',
            'description',
            'category',
            'price',
            'condition',
            'is_available',
            'posted_date',
            'location',
            'photo',
            'photo_url'
        ]
        read_only_fields = ['resource_id', 'posted_date']

    def get_photo_url(self, obj):
        """
        Get the complete URL for the photo
        """
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
        return None

    def validate_price(self, value):
        """
        Validate that price is positive
        """
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative")
        return value

    def validate_condition(self, value):
        """
        Validate that condition is one of the allowed choices
        """
        valid_conditions = dict(Resource.CONDITION_CHOICES)
        if value not in valid_conditions:
            raise serializers.ValidationError(
                f"Invalid condition. Must be one of: {', '.join(valid_conditions.keys())}"
            )
        return value

class ResourceListSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for list views
    """
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    
    class Meta:
        model = Resource
        fields = [
            'resource_id',
            'title',
            'description',
            'owner_name',
            'price',
            'category',
            'is_available',
            'posted_date',
            'location'
        ]
        read_only_fields = ['resource_id', 'posted_date']