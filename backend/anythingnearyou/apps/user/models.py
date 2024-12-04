from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password, full_name, user_type, institution, phone_number=None):
        """
        Create and return a regular user with an email, password, and other required fields.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, user_type=user_type,
                         institution=institution, phone_number=phone_number)
                         
        # Manually hash the password and set it to the password_hash field
        user.password_hash = make_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, full_name, institution, phone_number=None):
        """
        Create and return a superuser with an email, password, and other required fields.
        """
        user = self.create_user(email=email, password=password, full_name=full_name,
                                user_type='senior', institution=institution, phone_number=phone_number)
        user.is_active = True
        user.save(using=self._db)
        return user

class User(models.Model):
    USER_TYPE_CHOICES = [
        ('junior', 'Junior'),
        ('senior', 'Senior'),
    ]
    
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    institution = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    objects = UserManager()  # Attach the custom manager

    def __str__(self):
        return self.full_name