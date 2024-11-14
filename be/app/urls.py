from django.urls import path
from app.views.user import login,get_user_details

urlpatterns = [
  
    path('v1/login', login, name='Login'),

    path("v1/user/profile", get_user_details, name="get_user_profile_details"),
]
