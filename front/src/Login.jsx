import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from './redux/slices/authslice';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true; //withCredentials 옵션은 단어 그대로, 다른 도메인(Cross Origin)에 요청을 보낼 때 요청에 인증(credential) 정보를 담아서 보낼 지를 결정하는 항목이다. 즉, 쿠키나 인증 헤더 정보를 포함시켜 요청하고 싶다면, 클라이언트에서 API 요청 메소드를 보낼때 withCredentials 옵션을 true로 설정해야한다.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      alert('입력값을 확인해주세요.');
      return;
    }

    axios
      .post('http://localhost:8080/login', values)
      .then((res) => {
        if (res.status === 201) {
          // console.log(res);
          const decoded = jwtDecode(res.data.token);
          console.log(decoded);
          dispatch(login({ authData: decoded }));
          navigate('/');
        } else {
          alert('로그인에 실패했습니다.');
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Sign-In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            name="email"
            className="form-control"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Your Password..."
            name="password"
            className="form-control"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn">
          Sign In
        </button>
        <p>Agree to our Terms and Policies</p>
        <Link to="/register">Create Account</Link>
      </form>
    </div>
  );
};

export default Login;
