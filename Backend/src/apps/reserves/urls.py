from django.urls import path
from src.apps.reserves.views import ReserveView, OnlyUser, OnlyAdmin

urlpatterns = [
    path('areserves', OnlyAdmin.as_view(
        {'get': 'getReserves', 'put': 'updateReserves'})),
    path('ureserves', OnlyUser.as_view(
        {'get': 'getReservesByUser', 'post': 'createReserve'})),
    path('reserves/<int:id>',
         ReserveView.as_view({'get': 'getReservesByFieldAndDay'})),
]
