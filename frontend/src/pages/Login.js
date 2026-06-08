import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
  <div className="auth-page">

    <div className="auth-card">

      <div className="auth-header">
        <h1 className="brand">Nirapod<span>Sheba</span></h1>
        <p>Trusted Care, Guided by Faith</p>
      </div>

      <form onSubmit={handleLogin}>

        <div className="role-select">
          <button type="button">Parent</button>
          <button type="button">Babysitter</button>
          <button type="button">Admin</button>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={loginInfo.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginInfo.password}
          onChange={handleChange}
        />

        <div className="auth-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span className="link"></span>
        </div>

        <button className="primary-btn">Sign In</button>

        <div className="divider"></div>

        
        <p className="switch">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>

      </form>

    </div>

    <ToastContainer />
  </div>
)
}

export default Login