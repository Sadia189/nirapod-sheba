import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logoImage from '../assets/s.jpg';
function CreateProfile() {
    useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('loggedInUser');

    if (!user) {
        navigate('/signup');
    } else if (!token) {
        navigate('/login');
    }
}, []);
    const navigate = useNavigate();
     const [image, setImage] = useState(null);
    const [form, setForm] = useState({
        name: '',
        location: '',
        price: '',
        experience: '',
        phone: '',
        bio: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("location", form.location);
        formData.append("price", form.price);
        formData.append("experience", form.experience);
        formData.append("phone", form.phone);
        formData.append("bio", form.bio);

        if (image) {
            formData.append("image", image);
        }

        await axios.post(
            'http://localhost:8080/products/add',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        alert("Profile Created ✅");
        navigate('/');

    } catch (err) {
        console.log(err);
        alert("Error ❌");
    }
};

    return (
    <div className="landing-container">

        {/* ===== NAVBAR ===== */}
        <nav className="navbar">
            <div className="logo-section">
                <img src={logoImage} alt="NirapodSheba" className="logo-image" />
                <div>
                    <h2 className="logo-title">Nirapod<span>sheba</span></h2>
                    <p className="logo-tagline">Trusted Care, Guided by Faith</p>
                </div>
            </div>

           
            
                    
                
        
        </nav>

        {/* ===== PAGE CONTENT ===== */}
        <div className="create-profile-container">
            <div className="create-profile-card">
                <h2>Create Babysitter Profile</h2>

                <form onSubmit={handleSubmit} className="create-profile-form">
                    <input name="name" placeholder="Name" onChange={handleChange} /><br /><br />
                    <input name="location" placeholder="Location" onChange={handleChange} /><br /><br />
                    <input name="price" placeholder="Price" onChange={handleChange} /><br /><br />
                    <input name="experience" placeholder="Experience" onChange={handleChange} /><br /><br />
                    <input name="phone" placeholder="Phone" onChange={handleChange} /><br /><br />
                    <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea><br /><br />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button type="submit">Create Profile</button>
                </form>
            </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="site-footer">
            <div className="footer-top">

                <div className="footer-brand">
                    <div className="footer-logo">
                        <img src={logoImage} alt="NirapodSheba" className="footer-logo-img" />
                        <div>
                            <span className="footer-logo-title">nirapod<span>sheba</span></span>
                            <p className="footer-logo-tagline">Trusted Care, Guided by Faith</p>
                        </div>
                    </div>

                    <p className="footer-desc">
                        Bangladesh's most trusted babysitter booking platform. Verified, safe and aligned with your values.
                    </p>
                </div>

                <div className="footer-col">
                    <h5>For Parents</h5>
                    <ul>
                        <li>Find Babysitters</li>
                        <li>How It Works</li>
                        <li>Safety Center</li>
                        <li>Parent Reviews</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h5>For Babysitters</h5>
                    <ul>
                        <li>Join Us</li>
                        <li>Verification Process</li>
                        <li>Earning</li>
                        <li>Guidelines</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h5>Company</h5>
                    <ul>
                        <li>About Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms Of Service</li>
                        <li>Contact</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Nirapodsheba. All rights reserved.</p>
                <p>Made with Nirapodsheba team for Bangladeshi Families</p>
            </div>
        </footer>

    </div>
    );
}

export default CreateProfile;