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
export const refreshToken = (refresh) => {
  return http.post("/api/auth/jwt/refresh/", {
    refresh,
  });
};

// 토큰 유효성 확인
export const verifyToken = (token) => {
  return http.post("/api/auth/jwt/verify/", {
    token,
  });
};

// 회원가입
export const registerUser = (userData) => {
  // userData: { email, password, re_password, ... }
  return http.post("/api/auth/users/", userData);
};

// 현재 로그인된 사용자 정보 조회
export const getCurrentUser = () => {
  return http.get("/api/auth/users/me/");
};