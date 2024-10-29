from django.db import models
from ..user.models import User
from django.utils import timezone

# Create your models here.
class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_chats')  # Foreign key to User (sender)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_chats')  # Foreign key to User (receiver)
    message = models.TextField()
    sent_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Chat from {self.sender.full_name} to {self.receiver.full_name}"
