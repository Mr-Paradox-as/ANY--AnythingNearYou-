from django.db import models

class User(models.Model):
    USER_TYPE_CHOICES = [
        ('junior', 'Junior'),
        ('senior', 'Senior'),
    ]
    
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    institution = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.full_name