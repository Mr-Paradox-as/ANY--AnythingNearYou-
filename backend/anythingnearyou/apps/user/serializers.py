from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'full_name', 'phone_number', 'user_type', 'institution', 'created_at', 'is_active']
    
    def create(self, validated_data):
        # Hash the password
        validated_data['password_hash'] = make_password(validated_data.pop('password'))
        return super().create(validated_data)