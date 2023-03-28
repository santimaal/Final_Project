from django.db import models
from src.apps.core.models import TimestampedModel

# Create your models here.


class Sport(TimestampedModel, models.Model):
    name = models.CharField(max_length=100, blank=False)
    img = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name_plural = 'Sports'

    def __str__(self):
        return self.id
