from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'email', 'password_hash', 'full_name', 'phone_number', 'user_type', 'institution']
        extra_kwargs = {
            'password_hash': {'write_only': True},  # Ensures password is not returned in responses
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
