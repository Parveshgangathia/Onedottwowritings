from django.db import models
from ckeditor.fields import RichTextField # Import the new editor

class Story(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    # Changed from TextField to RichTextField
    content = RichTextField() 
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    
    is_short_story = models.BooleanField(default=True) 

    def __str__(self):
        return self.title