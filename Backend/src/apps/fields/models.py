from django.db import models
from src.apps.sports.models import Sport
from src.apps.core.models import TimestampedModel


# Create your models here.

class Field(TimestampedModel, models.Model):
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    img = models.CharField(max_length=200, blank=True, default="https://media.istockphoto.com/id/1355687112/photo/various-sport-equipment-gear.jpg?b=1&s=170667a&w=0&k=20&c=hEADFXL4HG9mF94yC5g3JA8lMHn8OZg7hRLoiel_L48=")
    active = models.BooleanField(blank=False, default=True)

    class Meta:
        verbose_name_plural = 'Slots'

    def __str__(self):
        return self.id
