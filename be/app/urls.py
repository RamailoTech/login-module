from django.urls import path
from app.views.user import login

urlpatterns = [
  
    path('v1/login', login, name='Login'),
]
