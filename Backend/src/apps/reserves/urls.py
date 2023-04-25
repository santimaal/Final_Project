from django.urls import path
from src.apps.reserves.views import ReserveView, OnlyUser

urlpatterns = [
    path('reserves', ReserveView.as_view({'get': 'getReserves'})),
    path('ureserves', OnlyUser.as_view({'post': 'createReserve'})),
    path('reserves/<int:id>',
         ReserveView.as_view({'get': 'getReservesByField'})),
]
