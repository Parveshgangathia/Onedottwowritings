from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Story
from .serializers import StorySerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_stories(request):
    # Only show PUBLISHED stories to the frontend
    stories = Story.objects.filter(status='published') 
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_story_detail(request, slug):
    # Find the story with this specific URL name (slug)
    story = get_object_or_404(Story, slug=slug, status='published')
    serializer = StorySerializer(story)
    return Response(serializer.data)