import logging
from rest_framework.decorators import api_view
from app.builders.response_builder import ResponseBuilder


from app.services.decorators import firebase_authenticate,authenticate
from app.services.user_service import UserService

from app.serializers.user_serializer import UserProfileSerializer
logger = logging.getLogger(__name__)

@api_view(['POST'])
@firebase_authenticate()
def login(request):
    try:
        response = ResponseBuilder()
        decoded_token = request.data.get("decoded_token")

     
        email = decoded_token.get("email", None)
        name = decoded_token.get("name", "")
        profile=decoded_token.get("picture",None)
        if email is None:
            return response.result_object(
                {'message': "please use email to login"}).fail().bad_request_400().get_response()
        token = UserService.login(email, name,profile)
        return response.success().message("Access Token").result_object({"access_token": token}).ok_200().get_response()
    except Exception as e:
        message = "Unable to login user"
        logger.exception(f"User post :: exception:: {e} message:: {message}")
        return response.fail().result_object(
            {'message': message}).message(message).internal_error_500().get_response()
    

@api_view(["GET"])
@authenticate()
def get_user_details(request):
    response_builder = ResponseBuilder()
    try:
        user_id = request.user.id
        data = UserService.get_user_by_id(user_id=user_id)

        serializer = UserProfileSerializer(data).data

        return response_builder.success().result_object(serializer).message("User Profile").ok_200().get_response()
    except Exception as e:
        message = "unable to fetch the user info"
        logger.exception(f"User Get :: exception :: {e} message :: {message}")
        return response_builder.fail().result_object(
            {'message': message}).message(message).internal_error_500().get_response()