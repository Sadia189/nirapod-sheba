import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import logoImage from '../assets/s.jpg';

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');

        handleSuccess('User Logged Out');

        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="landing-container">

            <nav className="navbar">

                <div className="logo-section">
    <img
        src={logoImage}
        alt="NirapodSheba"
        className="logo-image"
    />

    <div>
        <h2 className="logo-title">
            NirapodSheba
        </h2>
        <p className="logo-tagline">
            Trusted Care, Guided by Faith
        </p>
    </div>
                </div>
<div>
{
    loggedInUser ? (
        <div className="user-section">
            <div className="user-avatar">
                {loggedInUser?.charAt(0).toUpperCase()}
            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    ) : (
                            <>
                                <button
                                    className="nav-btn"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>

                                <button
                                    className="nav-btn signup-btn"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </button>
                            </>
                        )
                    }
                </div>

            </nav>

            <section className="hero">

                <img
                    src={logoImage}
                    alt="NirapodSheba"
                    className="hero-logo"
                />

                <h2>
                    Trusted Care,
                    <span className="highlight">
                        {' '}Guided by Faith
                    </span>
                </h2>

                <p>
                    Find verified babysitters and ensure safe childcare
                    for your loved ones. Connect with trusted caregivers
                    and build a secure environment for every family.
                </p>

                {
                    !loggedInUser && (
                        <button
                            className="start-btn"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started →
                        </button>
                    )
                }

            </section>

            <ToastContainer />

        </div>
    );
}

export default Home;