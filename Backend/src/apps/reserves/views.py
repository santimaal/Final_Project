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

class ReserveView(viewsets.GenericViewSet):

    def getReservesByFieldAndDay(self, request, id):
        day = request.data.get('day', None)
        return JsonResponse(ReservesSerializer.getReservesByFieldAndDay(id, day=day), safe=False)


class OnlyUser(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def createReserve(self, request):
        reserve_data = request.data
        reserve_data['user'] = request.user.id
        return Response(ReservesSerializer.createReserve(reserve_data))

    def getReservesByUser(self, request):
        return JsonResponse(ReservesSerializer.getReservesByUser(request.user.id), safe=False)


class OnlyAdmin(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]

    def getReserves(self, request):
        return JsonResponse(ReservesSerializer.getReserves(), safe=False)
    
    def updateReserves(self, request):
        return Response(ReservesSerializer.updateReserves(request.data))
