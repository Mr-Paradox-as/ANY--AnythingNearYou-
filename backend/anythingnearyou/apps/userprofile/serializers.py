from rest_framework import serializers
from .models import Profile
from ..user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'email', 'full_name']
        read_only_fields = ['user_id', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            'profile_id', 
            'user',
            'city',
            'institution',
            'course_or_company',
            'year_of_joining',
            'bio',
            'last_updated'
        ]
        read_only_fields = ['profile_id', 'last_updated']

    def validate_year_of_joining(self, value):
        """
        Check that the year of joining is not in the future
        """
        from django.utils import timezone
        current_year = timezone.now().year
        if value > current_year:
            raise serializers.ValidationError("Year of joining cannot be in the future")
        return value
