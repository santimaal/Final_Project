from rest_framework import serializers
from src.apps.fields.models import Field
from src.apps.sports.models import Sport
from src.apps.sports.serializers import SportsSerializer
import json
from django.core.serializers import serialize


class FieldsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Field
        fields = ('id', 'sport', 'active', 'active', 'slug', 'img', 'pfh')

    def to_fields(instance):
        return {
            'id': instance.id,
            'sport': instance.sport.name,
            'slug': instance.slug,
            'active': instance.active,
            'img': instance.img,
            'pfh': instance.pfh
        }

    def getFields():
        fields = Field.objects.all()
        serialized = []
        for field in fields.iterator():
            fields = FieldsSerializer.to_fields(field)
            serialized.append(fields)
        return serialized
