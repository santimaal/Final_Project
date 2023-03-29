from django.db import models
from src.apps.sports.models import Sport
from src.apps.core.models import TimestampedModel


# Create your models here.

class Field(TimestampedModel, models.Model):
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    active = models.BooleanField(blank=False, default=True)

    class Meta:
        verbose_name_plural = 'Slots'

    def __str__(self):
        return self.id
