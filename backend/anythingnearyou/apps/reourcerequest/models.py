from django.db import models

# Create your models here.
# resourcerequest/models.py
from django.db import models
from django.contrib.auth.models import User
from ..resources.models import Resource

class ResourceRequest(models.Model):
    # Basic fields
    requester = models.ForeignKey(User, on_delete=models.CASCADE)
    requested_resource = models.ForeignKey(
        Resource,
        on_delete=models.CASCADE,
        related_name='requests'
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=100)
    budget = models.FloatField()
    needed_by = models.DateTimeField()
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Request by {self.requester.username} for {self.requested_resource.title}"

    class Meta:
        db_table = 'resourcerequest_resourcerequest'