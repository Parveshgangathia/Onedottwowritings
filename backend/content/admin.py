from django.contrib import admin
from .models import Story


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'created_at') # Columns to show in the list
    prepopulated_fields = {'slug': ('title',)} # Auto-fill the URL name from the Title