from rest_framework import serializers
from src.apps.reserves.models import Reserve
from src.apps.sports.models import Sport
from src.apps.sports.serializers import SportsSerializer
import json
from django.core.serializers import serialize


class ReservesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reserve
        Reserves = ('id', 'date_ini', 'date_ini', 'field', 'user')

    def to_reserves(instance):
        return {
            'id': instance.id,
            'field': instance.field.id,
            'user': instance.user.id,
            'date_ini': instance.date_ini,
            'date_fin': instance.date_fin,
        }

    def getFields():
        Reserves = Reserve.objects.all()
        serialized = []
        for reserve in Reserves.iterator():
            Reserves = ReservesSerializer.to_reserves(reserve)
            serialized.append(Reserves)
        return serialized
