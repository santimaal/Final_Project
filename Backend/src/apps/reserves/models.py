from django.db import models
from src.apps.fields.models import Field
from src.apps.user.models import User
from src.apps.core.models import TimestampedModel
import datetime
# Create your models here.

class Reserve(TimestampedModel, models.Model):

   field = models.ForeignKey(Field, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   date_ini = models.DateTimeField(editable=False, default=datetime.datetime.now)
   date_fin = models.DateTimeField(editable=True, default=datetime.datetime.now)

   class Meta:
       verbose_name = 'reserve'
       verbose_name_plural = 'reserves'

   def __str__(self):
       return self.id

