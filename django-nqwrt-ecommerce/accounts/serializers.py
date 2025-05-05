from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User

# dev_5_Fruit
# 도져 커스텀 마이징
class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "gender",
            "job",
            "old_cart",
        )


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = (
            "id",
            "username",
            "email",
            "gender",
            "job",
            "old_cart",
            "created_at",
            "updated_at",
        )

#dev_10_2_Fruit
from rest_framework import serializers

class UserRestAllAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "gender",
            "job",
            "old_cart",
            "created_at",
            "updated_at",
        )

from dj_rest_auth.registration.serializers import RegisterSerializer

#http://127.0.0.1:8000/api/dj-rest-auth/registration/
#https://dj-rest-auth.readthedocs.io/en/latest/configuration.html#register-serializer
class CustomRegisterSerializer(RegisterSerializer):
    # 추가 필드 정의
    gender = serializers.ChoiceField(choices=User.GenderChoices.choices, required=True)
    job = serializers.ChoiceField(choices=User.JOBS, required=True)
    # profile_image = serializers.URLField(required=False, allow_blank=True)
    # kakao_id = serializers.CharField(required=False, allow_blank=True)

    def get_cleaned_data(self):
        # 기본 필드 + 커스텀 필드
        data = super().get_cleaned_data()
        data['gender'] = self.validated_data.get('gender', '')
        data['job'] = self.validated_data.get('job', '')
        # data['profile_image'] = self.validated_data.get('profile_image', '')
        # data['kakao_id'] = self.validated_data.get('kakao_id', '')
        return data

    def custom_signup(self, request, user):
        # 추가 필드를 저장
        user.gender = self.validated_data.get('gender')
        user.job = self.validated_data.get('job')
        # user.profile_image = self.validated_data.get('profile_image')
        # user.kakao_id = self.validated_data.get('kakao_id')
        user.save()
