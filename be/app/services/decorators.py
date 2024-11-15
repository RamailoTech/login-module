
import logging
import firebase_admin
from firebase_admin import auth, credentials

from django.conf import settings

from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

from app.models.users import User
from app.utils.utils import get_or_none
from app.builders.response_builder import ResponseBuilder

logger = logging.getLogger(__name__)
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_app = firebase_admin.initialize_app(cred)


def firebase_authenticate():
    def decorator(func):
        def wrapper(*args, **kwargs):
            request = args[-1]
            token = request.data.get("token", None)

            if not token:
                return Response(
                    {"success": False, "data": "No Auth Token"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                decoded_token = auth.verify_id_token(token)
                request.data["decoded_token"] = decoded_token

            except auth.ExpiredIdTokenError:

                logger.debug("Login Token Expired")
                return Response(
                    {
                        "success": False,
                        "token_expired": True,
                        "data": "Login Token Expired",
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            except Exception as err:
                return Response(
                    {"success": False, "token_invalid": True,
                        "data": "Invalid Token"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            return func(*args, **kwargs)

        return wrapper

    return decorator


def authenticate():
    def decorator(func):
        def wrapper(*args, **kwargs):
            response_builder = ResponseBuilder()
            request = args[-1]
            auth_header = request.headers.get("Authorization")

            if not auth_header or not auth_header.startswith("Bearer "):
                return response_builder.fail().bad_request_400().message("No Auth Token").get_response()

            try:
                token = auth_header.split(" ")[1]
                payload = AccessToken(token).payload
                id = payload.get(settings.SIMPLE_JWT["USER_ID_CLAIM"])
                user = get_or_none(User, id=id)
                if not user:
                    return response_builder.fail().user_unauthorized_401.message("Invalid Auth Token").get_response()
                request.user = user
            except:
                return response_builder.fail().user_unauthorized_401().message("Invalid Auth Token").get_response()

            return func(*args,  **kwargs)
        return wrapper
    return decorator
