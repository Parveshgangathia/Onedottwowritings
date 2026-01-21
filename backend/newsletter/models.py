from django.db import models

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False) # Inactive until future confirmation
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email