from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from .models import User
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework_simplejwt.tokens import AccessToken
from .serializers import UserSerializer
import json


# Registration View
class RegisterView(APIView):
    def post(self, request):
        print("Request data:", json.loads(request.body))
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        if check_password(password, user.password_hash):
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {  # Add user details for the client-side
                    "id": user.id,
                    "email": user.email,
                }
            })
        else:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

# Logout View
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#Get all users 
class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserProfileView(APIView):
    def get(self, request):
        # Extract the token from the Authorization header
        authorization_header = request.headers.get("Authorization")
        
        # Check if the token is provided and split 'Bearer' and the token
        if authorization_header and authorization_header.startswith('Bearer '):
            access_t = authorization_header.split(' ')[1]
        else:
            return Response({"detail": "Authorization token missing"}, status=400)

        try:
            # Validate the token using AccessToken
            access = AccessToken(access_t)
            print("Token Payload:", access.payload)
        except Exception as e:
            raise AuthenticationFailed(f"Invalid or expired token: {str(e)}")

        # Debug: Print user info
        print("User authenticated:", request.user)
        print("Is user authenticated?", request.user.is_authenticated)

        # Return a simple response for testing purposes
        return Response({"message": "User profile retrieved successfully"}, status=200)
    


class CustomJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        authorization_header = request.headers.get("Authorization")
        
        if authorization_header and authorization_header.startswith('Bearer '):
            access_t = authorization_header.split(' ')[1]
        else:
            raise AuthenticationFailed("Authorization token missing")

        try:
            # Validate the token using AccessToken
            access = AccessToken(access_t)
            print("Token Payload:", access.payload)
            # Optionally: Get user from token (e.g., access.payload.get('user_id'))
            user = User.objects.get(id=access.payload['user_id'])
        except Exception as e:
            raise AuthenticationFailed(f"Invalid or expired token: {str(e)}")

        # Return the user and token
        return (user, access)  # This is expected by DRF