import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [role, setRole] = useState(''); // ✅ ROLE STATE

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;

        // ✅ VALIDATION
        if (!email || !password || !role) {
            return handleError('Email, password and role are required');
        }

        try {
            const url = `http://localhost:8080/auth/login`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                // ✅ SEND ROLE
                body: JSON.stringify({ ...loginInfo, role })
            });

            const result = await response.json();

            const { success, message, jwtToken, name, role: userRole, error } = result;

            if (success) {
                handleSuccess(message);

                // ✅ SAVE DATA
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('role', userRole);

                // ✅ ROLE-BASED REDIRECT
                setTimeout(() => {
                    if (userRole === 'parent') {
                        navigate('/');
                    } else if (userRole === 'babysitter') {
                        navigate('/');
                    } else {
                        navigate('/');
                    }
                }, 1000)

            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else {
                handleError(message);
            }

        } catch (err) {
            handleError("Something went wrong");
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

                    {/* ✅ ROLE SELECT */}
                    <div className="role-select">

                        <button
                            type="button"
                            onClick={() => setRole('parent')}
                            className={role === 'parent' ? 'active' : ''}
                        >
                            Parent
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole('babysitter')}
                            className={role === 'babysitter' ? 'active' : ''}
                        >
                            Babysitter
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={role === 'admin' ? 'active' : ''}
                        >
                            Admin
                        </button>

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

export default Login;