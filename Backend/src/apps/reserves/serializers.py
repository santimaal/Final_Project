from rest_framework import serializers
from src.apps.reserves.models import Reserve
import json
from django.core.serializers import serialize
from datetime import datetime, time, timedelta
from rest_framework import serializers
from django.utils.timezone import make_aware, get_current_timezone


class ReservesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reserve
        fields = '__all__'
        Reserves = ('id', 'date_ini', 'date_fin', 'field', 'user')

    def to_reserves(instance):
        return {
            'id': instance.id,
            'field': instance.field.id,
            'user': instance.user.id,
            'date_ini': instance.date_ini,
            'date_fin': instance.date_fin,
        }

    def getReserves():
        Reserves = Reserve.objects.all()
        serialized = []
        for reserve in Reserves.iterator():
            Reserves = ReservesSerializer.to_reserves(reserve)
            serialized.append(Reserves)
        return serialized

    def getReservesByField(id, day=None):
        if day is None:
            day = datetime.today()
        else:
            day = datetime.strptime(day, '%Y-%m-%d').date()

        date_ini = datetime.combine(day, time.min)
        date_end = datetime.combine(day + timedelta(days=1), time.min)

        Reserves = Reserve.objects.filter(
            field=id, date_ini__range=(date_ini, date_end))
        serialized = []
        for reserve in Reserves.iterator():
            serializer = ReservesSerializer(reserve, many=False)
            serialized.append(serializer.data)
        return serialized

    def createReserve(reserve_data):
        date_ini_str = reserve_data.get('date_ini')
        date_ini = datetime.strptime(date_ini_str, '%Y-%m-%dT%H:%M:%S.%fZ')
        date_ini = make_aware(date_ini, timezone=get_current_timezone())

        if Reserve.objects.filter(date_ini=date_ini).exists():
            raise serializers.ValidationError('Date was in use')

        reserve_serializer = ReservesSerializer(data=reserve_data)
        if reserve_serializer.is_valid(raise_exception=True):
            reserve_serializer.save()
            return reserve_serializer.data

    def getReservesByUser(user):
        Reserves = Reserve.objects.filter(user=user)
        serialized = []
        for reserve in Reserves.iterator():
            Reserves = ReservesSerializer.to_reserves(reserve)
            serialized.append(Reserves)
        return serialized
