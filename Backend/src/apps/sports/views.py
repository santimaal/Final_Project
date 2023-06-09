from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response

from src.apps.notifications.models import Noti
from src.apps.sports.serializers import SportsSerializer

from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from src.apps.core.permissions import IsAdmin

# Create your views here.


class SportsView(viewsets.GenericViewSet):

    def getSports(self, request):
        return JsonResponse(SportsSerializer.getSports(), safe=False)
    
    def createSport(self, request):
        sport_data = request.data
        sport_serializer = SportsSerializer(data=sport_data)
        if (sport_serializer.is_valid(raise_exception=True)):
            sport_serializer.save()
        return Response(sport_serializer.data)


# class OnlyAdmin(viewsets.GenericViewSet):
#     permission_classes = [IsAuthenticated, IsAdmin]

#     def getNotis(self, request):
#         bike = Noti.objects.all()
#         bike_serializer = NotiSerializer(bike, many=True)
#         return JsonResponse(bike_serializer.data, safe=False)

#     def createNoti(self, request):
#         return Response("hello")
