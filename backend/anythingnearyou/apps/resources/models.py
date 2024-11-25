from django.db import models
from ..user.models import User
from django.utils import timezone
import os

# Create your models here.
class Resource(models.Model):
    CONDITION_CHOICES = [
        ('new', 'New'),
        ('good', 'Good'),
        ('used', 'Used'),
    ]

    resource_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources')  # Foreign key to User
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=100)
    price = models.FloatField()
    condition = models.CharField(max_length=10, choices=CONDITION_CHOICES)
    is_available = models.BooleanField(default=True)
    is_negotiable = models.BooleanField(default=True)
    posted_date = models.DateTimeField(default=timezone.now)
    location = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='resource_photos/', null=True, blank=True)

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        # Delete the image file when the model instance is deleted
        if self.photo:
            if os.path.isfile(self.photo.path):
                os.remove(self.photo.path)
        super().delete(*args, **kwargs)