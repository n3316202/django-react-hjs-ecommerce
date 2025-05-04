import React, { useEffect, useState } from 'react'
import '/src/assets/login/css/login.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { getCurrentUser } from '@/api/AuthApi';

//dev_5_Fruit
const Login = () => {

  const { login , getUser} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("✅ 로그인 성공!");
      navigate("/"); // 로그인 성공 후 루트로 이동
    } catch (error) {
      alert("❌ 로그인 실패: " + error.message);
    }
  };

//dev_10_Fruit
useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY) //import.meta.env.VITE_REQUEST_URL
    }
}, [])

const handleKakaoLogin = () => {
  if (!window.Kakao) {
    console.log('카카오 모듈 없음 ....')
    return
  }


  window.Kakao.Auth.login({
    scope: 'profile_nickname, account_email, gender', // 원하는 scope
    success: async function (authObj) {
      const kakaoAccessToken = authObj.access_token
      console.log('Kakao Access Token:', kakaoAccessToken)
      
      //https://developers.kakao.com/docs/latest/ko/kakaologin/js
      //https://velog.io/@ads0070/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-API%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9D%B8%EC%A6%9D%ED%95%98%EA%B8%B0
      //스텝 1과 스텝2 를 마친 과정
      //현재 단계	Kakao 로그인 성공 후 access_token을 받은 시점
      
      //아래는 스테3 아래는 발급받은 토큰으로 사용자 정보 조회
      //다음 단계	access_token을 백엔드에 전달 → 사용자 인증 처리
      try {
        let response = await axios.post(`${import.meta.env.VITE_REQUEST_URL}/api/dj-rest-auth/kakao/`, {
          access_token: kakaoAccessToken,
        })

        console.log('로그인 성공:', response.data)
        // JWT 저장 및 로그인 상태 업데이트 등
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)

        // 리다이렉트 등 테스트 코드
        response = await getUser()
        console.log('리스판스')
        console.log(response)

        navigate('/') // ← 로그인 성공 후 홈으로 리다이렉트
      } catch (error) {
        console.error('카카오 로그인 실패:', error.response?.data || error)
      }
    },
    fail: function (err) {
      console.error('Kakao 로그인 에러', err)
    },
  })
}
  return (
    <div className="form-bg">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 col-md-offset-4">
                    <div className="form-container">
                    {/* dev_10_Fruit */}
                    <div className="form-icon" onClick={handleKakaoLogin}>
                        <i className="fa fa-user" />
                    </div>
                    <h3 className="title">Login</h3>
                    <form className="form-horizontal">
                        <div className="form-group">
                        <label>email</label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="form-group">
                        <label>password</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <button type="button" className="btn btn-default" onClick={handleLogin}>
                        Login
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login

