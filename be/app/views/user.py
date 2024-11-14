from rest_framework.decorators import api_view
from app.builders.response_builder import ResponseBuilder
from app.services.decorators import firebase_authenticate
from app.services.user_service import UserService


@api_view(['POST'])
@firebase_authenticate()
def login(request):
    response = ResponseBuilder()
    decoded_token = request.data.get("decoded_token")

    breakpoint()
    
    email = decoded_token.get("email", None)
    name = decoded_token.get("name", "")
    
    if email is None:
        return response.result_object(
            {'message': "please use email to login"}).fail().bad_request_400().get_response()
    token = UserService.login(email, name)
    return response.success().message("Access Token").result_object({"access_token": token}).ok_200().get_response()