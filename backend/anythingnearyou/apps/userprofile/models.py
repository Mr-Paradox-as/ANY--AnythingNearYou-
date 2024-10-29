from django.db import models
from ..user.models import User
# Create your models here.
class Profile(models.Model):
    profile_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')  # Related to User with one-to-one relationship
    city = models.CharField(max_length=100)
    institution = models.CharField(max_length=255)
    course_or_company = models.CharField(max_length=255)
    year_of_joining = models.IntegerField()
    bio = models.TextField(blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.full_name}'s Profile"
