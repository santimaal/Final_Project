from django.urls import path
from src.apps.sports.views import SportsView

urlpatterns = [
    path('sports', SportsView.as_view( {'get': 'getSports', 'post': 'createSport'})),
    # path('anoti', OnlyAdmin.as_view( {'get': 'getNotis', 'post': 'createNoti'})),
    # path('noti/<int:id>', NotiView.as_view({'get': 'getOneNoti', 'delete': 'deleteNoti'})),
    # path('restaurants', GetRestaurants.as_view()),
]
