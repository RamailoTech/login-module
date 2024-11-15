from rest_framework import serializers
from app.models.users import User



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}
