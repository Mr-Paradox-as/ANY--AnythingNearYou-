from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from .models import User
from .serializers import UserSerializer

class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Get the plain password from the validated data
            password = serializer.validated_data.get('password_hash')

            # Use the custom manager to create the user (pass plain password)
            user = User.objects.create_user(
                email=serializer.validated_data['email'],
                password=password,  # pass the plain password here
                full_name=serializer.validated_data['full_name'],
                user_type=serializer.validated_data['user_type'],
                institution=serializer.validated_data['institution'],
                phone_number=serializer.validated_data.get('phone_number', None),
            )

            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)