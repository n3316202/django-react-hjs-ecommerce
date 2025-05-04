import http from './HttpCommon';

// # 경로	설명
// # POST /auth/jwt/create/	로그인 (토큰 발급)
// # POST /auth/jwt/refresh/	액세스 토큰 갱신
// # POST /auth/jwt/verify/	토큰 유효성 확인
// # POST /auth/users/	회원가입
// # GET /auth/users/me/	현재 로그인된 사용자 조회
//http://127.0.0.1:8000/api/

// 로그인 - 토큰 발급
export const loginUser = (username, password) => {
  return http.post("/api/auth/jwt/create/", {
    username,
    password,
  });
};

// 액세스 토큰 갱신
// export const refreshToken = (refresh) => {
//   return http.post("/api/auth/jwt/refresh/", {
//     refresh,
//   });
// };

// // 토큰 유효성 확인
// export const verifyToken = (token) => {
//   return http.post("/api/auth/jwt/verify/", {
//     token,
//   });
// };

// // 회원가입
// export const registerUser = (userData) => {
//   // userData: { email, password, re_password, ... }
//   return http.post("/api/auth/users/", userData);
// };

// // 현재 로그인된 사용자 정보 조회
// export const getCurrentUser = () => {
//   return http.get("/api/auth/users/me/");
// };

//#http://127.0.0.1:8000/api/dj-rest-auth/login/
// # ✅ 기본 엔드포인트 목록 (JWT 기준)
// # HTTP Method	Endpoint URL	설명
// # POST	/dj-rest-auth/login/	로그인 (JWT 또는 세션)
// # POST	/dj-rest-auth/logout/	로그아웃 (세션 삭제 or 쿠키 삭제)
// # POST	/dj-rest-auth/registration/	회원가입
// # POST	/dj-rest-auth/password/change/	비밀번호 변경
// # POST	/dj-rest-auth/password/reset/	비밀번호 초기화 이메일 전송
// # POST	/dj-rest-auth/password/reset/confirm/	비밀번호 초기화 완료
// # GET	/dj-rest-auth/user/	현재 로그인된 사용자 정보 가져오기
// # PUT/PATCH	/dj-rest-auth/user/	사용자 정보 수정

// 현재 로그인된 사용자 정보 조회
export const getCurrentUser = () => {
  return http.get("/api/dj-rest-auth/user/");
};

// # ✅ JWT 사용 시 추가 엔드포인트
// # (dj-rest-auth 설정에서 REST_USE_JWT = True 설정한 경우)

// # HTTP Method	Endpoint URL	설명
// # POST	/dj-rest-auth/jwt/create/	JWT 로그인 (access + refresh 발급)
// # POST	/dj-rest-auth/jwt/refresh/	access token 재발급
// # POST	/dj-rest-auth/jwt/verify/	JWT 유효성 검증

// # ✅ 소셜 로그인 시 추가 엔드포인트 (예: Kakao, Google 등)
// # allauth 및 dj-rest-auth.registration을 함께 설정해야 합니다.

// # HTTP Method	Endpoint URL	설명
// # POST	/dj-rest-auth/social/login/	소셜 로그인 (provider, access_token 전달)
// # POST	/dj-rest-auth/registration/	소셜 로그인 시 회원가입
