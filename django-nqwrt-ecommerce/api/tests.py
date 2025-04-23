# Create your tests here.
from django.test import TestCase
import jwt


# dev_5_Fruit
# 🔍 해석
# 필드	          의미	                 값 해석
# exp	Expiration Time (만료 시간)	1744884869 → UTC 기준 2025-05-17 07:34:29 에 토큰 만료
# iat	Issued At (발급 시각)	1744280069 → UTC 기준 2025-05-10 07:34:29 에 토큰 발급
# jti	JWT ID (토큰 고유 ID)	"01fdf4faad8c4a17bd9f038aeb052d5b" → 이 토큰을 식별하기 위한 고유한 ID (무작위 UUID처럼 사용)


class ApiTest(TestCase):
    def test_jwt_decode_access_token(self):
        access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MjgxODY5LCJpYXQiOjE3NDQyODAwNjksImp0aSI6ImNmZWQ2OWVkNzRhOTRiODlhMjNjYWQxNTU4MWEzMDNmIiwidXNlcl9pZCI6MX0.1X7T5UbLrRxAutk8SdvZbV0a7vUiBX2SAT03QReBTKY"

        refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDg4NDg2OSwiaWF0IjoxNzQ0MjgwMDY5LCJqdGkiOiIwMWZkZjRmYWFkOGM0YTE3YmQ5ZjAzOGFlYjA1MmQ1YiIsInVzZXJfaWQiOjF9.Gj-oFC0ZdSdKyqqYWXPEFGweXoTwlW7aC-fC4zjdrKA"

        print("\n▶ ACCESS TOKEN 디코딩 결과:")
        access_decoded = jwt.decode(access_token, options={"verify_signature": False})
        for key, value in access_decoded.items():
            print(f"{key}: {value}")

        print("\n▶ REFRESH TOKEN 디코딩 결과:")
        refresh_decoded = jwt.decode(refresh_token, options={"verify_signature": False})
        for key, value in refresh_decoded.items():
            print(f"{key}: {value}")

        # 기본적인 체크
        self.assertEqual(access_decoded["token_type"], "access")
        self.assertEqual(refresh_decoded["token_type"], "refresh")
        self.assertEqual(access_decoded["user_id"], 1)
        self.assertEqual(refresh_decoded["user_id"], 1)


from rest_framework.test import APITestCase
from rest_framework import status


class UserMeAPITest(APITestCase):
    def setUp(self):
        # 이미 발급받은 토큰을 여기에 넣으세요
        self.access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MjgzMTcyLCJpYXQiOjE3NDQyODEzNzIsImp0aSI6ImQzYzE5MWYzZjRhYzQ0MmE4NTU0YzIyOGQ1ZGM5ZjhiIiwidXNlcl9pZCI6MX0.BlLTY1T1mUyB4t2BKgGE2YaY6LXnrIHfvogJ9RtB-wo"
        self.url = "http://127.0.0.1:8000/api/auth/users/me/"

    def test_get_user_me(self):
        # Authorization 헤더에 JWT 토큰 포함
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

        response = self.client.get(self.url)

        print("🔎 응답 JSON:", response.json())

        # 테스트: 200 OK 확인
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # 테스트: 사용자 정보에 username 포함 여부
        self.assertIn("username", response.data)
