from django.shortcuts import render


from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from src.apps.core.permissions import IsAdmin


from src.apps.fields.models import Field
from src.apps.fields.serializers import FieldsSerializer
from rest_framework.views import APIView

# Create your views here.


class FieldView(viewsets.GenericViewSet):

    def getFields(self, request):
        return JsonResponse(FieldsSerializer.getFields(), safe=False)

    def createField(self, request):
        field_data = request.data
        field_serializer = FieldsSerializer(data=field_data)
        if (field_serializer.is_valid(raise_exception=True)):
            field_serializer.save()
        return Response(field_serializer.data)
