from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Subscriber
from .serializers import SubscriberSerializer

@api_view(['POST'])
def subscribe(request):
    # 1. Check if email already exists to avoid duplicates
    email = request.data.get('email')
    if Subscriber.objects.filter(email=email).exists():
        return Response({"message": "You are already subscribed!"}, status=200)

    # 2. Validate and Save
    serializer = SubscriberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Welcome to the inner circle."}, status=201)
    
    return Response(serializer.errors, status=400)