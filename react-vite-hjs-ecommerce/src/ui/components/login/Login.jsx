import React, { useState } from 'react'
import '/src/assets/login/css/login.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

//dev_5_Fruit
const Login = () => {

  const { login } = useAuth();
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

  return (
    <div className="form-bg">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 col-md-offset-4">
                    <div className="form-container">
                    <div className="form-icon">
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

