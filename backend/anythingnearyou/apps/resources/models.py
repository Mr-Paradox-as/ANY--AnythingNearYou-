from django.db import models
from ..user.models import User
from django.utils import timezone

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
    posted_date = models.DateTimeField(default=timezone.now)
    location = models.CharField(max_length=100)
    image_urls = models.TextField(blank=True)  # Store as JSON string for multiple URLs

    def __str__(self):
        return self.title
