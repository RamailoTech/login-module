
from rest_framework_simplejwt.tokens import RefreshToken
from app.utils.utils import get_or_none
from app.models import User


class UserService:
    def __init__(self, user):
        self.user = user

    @staticmethod
    def create_user(email, name,profile):
        return User.objects.create(email=email, name=name,profile=profile)

    @staticmethod
    def get_user_by_email(email):
        return get_or_none(User, email=email)

    def __generate_auth_token(self):
        refresh = RefreshToken.for_user(self.user)
        return str(refresh.access_token)

    @classmethod
    def login(cls, email, name,profile):
        user = cls.get_user_by_email(email)
        if not user:
            user = cls.create_user(email, name,profile)
        return cls(user).__generate_auth_token()
    
    @staticmethod
    def get_user_by_id(user_id):
        return get_or_none(User, id=user_id)