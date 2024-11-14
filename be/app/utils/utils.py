import uuid
from datetime import datetime
from django.conf import settings


def get_char_uuid(length: int = None) -> str:
    id = uuid.uuid4().hex
    return id[:length]

def generate_filename(filename):
    extension=filename.split('.')[-1]
    new_filename=f"{get_char_uuid(length=20)}.{extension}"
    return new_filename


def upload_path(instance,filename,base_folder):
    filename=generate_filename(filename)
    return f"{base_folder}/{instance.id}/{filename}"

def kyc_path(instance, filename):
    return upload_path(instance=instance, filename=filename, base_folder=settings.S3_KYC_FOLDER)


def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None