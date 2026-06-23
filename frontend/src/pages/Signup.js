import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    // ✅ ADD ROLE STATE
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSignupInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;

        // ✅ VALIDATION (INCLUDING ROLE)
        if (!name || !email || !password || !role) {
            return handleError('Name, email, password and role are required');
        }

        try {
            const url = `http://localhost:8080/auth/signup`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                // ✅ SEND ROLE TO BACKEND
                body: JSON.stringify({ ...signupInfo, role })
            });

            const result = await response.json();

            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);

                setTimeout(() => {
                    navigate('/login');
                }, 1000);

            } else if (error) {
                const details = error?.details?.[0]?.message;
                handleError(details || "Validation error");

            } else {
                handleError(message);
            }

        } catch (err) {
            handleError("Something went wrong");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <h1 className="brand">Nirapod<span>Sheba</span></h1>
                    <p>Trusted Care, Guided by Faith</p>
                </div>

                <form onSubmit={handleSignup}>

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
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={signupInfo.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={signupInfo.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupInfo.password}
                        onChange={handleChange}
                    />

                    <button className="primary-btn">
                        Sign Up
                    </button>

                    <p className="switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                </form>

            </div>

            <ToastContainer />
        </div>
    );
}

export default Signup;