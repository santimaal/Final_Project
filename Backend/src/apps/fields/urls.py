from django.urls import path
from src.apps.fields.views import FieldView

urlpatterns = [
    path('fields', FieldView.as_view({'get': 'getFields','post': 'createField'})),
    
]
