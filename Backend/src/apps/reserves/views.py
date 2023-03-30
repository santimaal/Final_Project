from django.shortcuts import render


from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from src.apps.core.permissions import IsAdmin


from src.apps.reserves.models import Reserve
from src.apps.reserves.serializers import ReservesSerializer
from rest_framework.views import APIView

# Create your views here.


class ReserveView(viewsets.GenericViewSet):

# not finished
    def getReserves(self, request):
        return JsonResponse(ReservesSerializer.getFields(), safe=False)

    def createReserve(self, request):
        reserve_data = request.data
        reserve_serializer = ReservesSerializer(data=reserve_data)
        if (reserve_serializer.is_valid(raise_exception=True)):
            reserve_serializer.save()
        return Response(reserve_serializer.data)
