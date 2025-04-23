from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

# dev_30
from .views import base_views, product_views, category_views

# dev_34
from rest_framework import routers

# dev_28
app_name = "api"

# dev_35
router = routers.DefaultRouter()
router.register(r"categories", category_views.CategoryViewSet)

# dev_30
urlpatterns = [
    # base_views.py
    path("hello_world/", base_views.hello_world),
    path("hello_world_drf/", base_views.hello_world_drf),
    # product_views.py
    path("products/", product_views.products_api),
    path("product/<int:pk>/", product_views.product_api),  # dev_30
    # dev_31
    # path("categories/", category_views.CategoriesAPI.as_view()),  # dev_31
    # path("category/<int:pk>/", category_views.CategoryAPI.as_view()),  # dev_31
    # dev_33
    # path("categories/", category_views.CategoriesMixins.as_view()),  # dev_33
    # path("category/<int:pk>/", category_views.CategoryMixins.as_view()),  # dev_33
    # path("categories/", category_views.CategoriesAPI.as_view()),  # dev_34
    # path("category/<int:pk>/", category_views.CategoryAPI.as_view()),  # dev_34
    # dev_34 http://127.0.0.1:8000/api/categories/
    # 이렇게 하면 다음 경로들이 자동으로 만들어집니다:
    # GET /categories/
    # POST /categories/
    # GET /categories/<pk>/
    # PUT /categories/<pk>/
    # PATCH /categories/<pk>/
    # DELETE /categories/<pk>/
    path("", include(router.urls)),
    # dev_5_Fruit
    # djoser의 JWT 로그인 뷰를 오버라이드해서
    # 인증 설정에서 JWT 
    path("auth/", include("djoser.urls")),  # 회원가입, 비밀번호 변경 등
    path("auth/", include("djoser.urls.jwt")), # JWT 로그인/로그아웃, 토큰 갱신 등
]
# dev_5_Fruit
# 2. 생성되는 URL
# ✅ djoser.urls (/auth/ 아래에 생성되는 URL)

# 메서드	경로	설명
# POST	/auth/users/	회원가입
# GET	    /auth/users/me/	현재 로그인된 유저 정보
# POST	/auth/users/resend_activation/	활성화 이메일 재전송 (선택)
# POST	/auth/users/activation/	계정 활성화 (선택)
# POST	/auth/users/set_password/	비밀번호 변경 (로그인 상태)
# POST	/auth/users/reset_password/	비밀번호 재설정 이메일 전송
# POST	/auth/users/reset_password_confirm/	비밀번호 재설정 확인
# POST	/auth/token/login/	세션 로그인 (Token 기반 인증 사용 시)
# POST	/auth/token/logout/	세션 로그아웃 (Token 기반 인증 사용 시)

# ✅ djoser.urls.jwt (/auth/jwt/ 아래에 생성되는 URL)

# 메서드	경로	설명
# POST	/auth/jwt/create/	JWT 로그인 (access + refresh 발급)
# POST	/auth/jwt/refresh/	access 토큰 재발급
# POST	/auth/jwt/verify/	토큰 유효성 검사
# POST	/auth/jwt/logout/	로그아웃 (refresh 토큰 블랙리스트 처리)
