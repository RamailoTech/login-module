from django.db import models

from app.utils.utils import get_char_uuid,kyc_path


class BaseModel(models.Model):
    id = models.CharField(max_length=100, primary_key=True,
                          default=get_char_uuid)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = models.Manager()

    class Meta:
        abstract = True


class User(BaseModel):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    profile = models.URLField(max_length=255)

