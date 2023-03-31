from rest_framework import serializers
from src.apps.sports.models import Sport
import json
from django.core.serializers import serialize


class SportsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sport
        fields = ('id', 'name', 'img')

    def to_sports(instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'img': instance.img,
        }

    def getSports():
        sports = Sport.objects.all()
        serialized = []
        for sport in sports.iterator():
            fields = SportsSerializer.to_sports(sport)
            serialized.append(fields)
        return serialized
