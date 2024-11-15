from django.contrib import admin
from app.models.users import User
# Register your models here.
class Useradmin(admin.ModelAdmin):
    pass

admin.site.register(User,Useradmin)