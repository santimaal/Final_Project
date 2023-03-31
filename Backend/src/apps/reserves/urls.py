from django.urls import path
from src.apps.reserves.views import ReserveView

urlpatterns = [
    path('reserves', ReserveView.as_view({'get': 'getReserves','post': 'createReserve'})),
    
]
