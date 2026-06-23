// Home.js - Full homepage matching design screenshot
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import logoImage from '../assets/s.jpg';
import babysitterImage from '../assets/y.jpg';
import babysitterImage1 from '../assets/11.jpg';
import babysitterImage2 from '../assets/2.jpg';
import babysitterImage3 from '../assets/3.jpg';
import babysitterImage4 from '../assets/4.jpg';
import babysitterImage5 from '../assets/5.jpg';
function Home() {

    const [location, setLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [allSitters, setAllSitters] = useState([]);
    const [sitters, setSitters] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState('');

    const navigate = useNavigate();

    // =========================
    // GET USER (UI ONLY)
    // =========================
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    // =========================
    // LOAD ALL SITTERS (NO LOGIN REQUIRED)
    // =========================
    useEffect(() => {

        const fetchAllSitters = async () => {
            try {
                setLoading(true);

                const res = await fetch('http://localhost:8080/products');
                const data = await res.json();

                console.log("RAW API RESPONSE:", data);

                const list =
                    Array.isArray(data)
                        ? data
                        : Array.isArray(data?.products)
                            ? data.products
                            : Array.isArray(data?.data)
                                ? data.data
                                : [];

                setAllSitters(list);
                setSitters(list);

            } catch (error) {
                console.log("Load error:", error);
                setAllSitters([]);
                setSitters([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllSitters();

    }, []);

    // =========================
    // SEARCH FUNCTION
    // =========================
    const handleSearch = async () => {

        try {

            setLoading(true);

            const query = `http://localhost:8080/products?location=${location}&min=${minPrice}&max=${maxPrice}`;

            const res = await fetch(query);
            const data = await res.json();

            const list =
                Array.isArray(data)
                    ? data
                    : Array.isArray(data?.products)
                        ? data.products
                        : Array.isArray(data?.data)
                            ? data.data
                            : [];

            setSitters(list);

        } catch (error) {
            console.log("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // RESET SEARCH
    // =========================
    const resetSearch = () => {
        setLocation('');
        setMinPrice('');
        setMaxPrice('');
        setSitters(allSitters);
    };

    // =========================
    // LOGOUT (UI ONLY)
    // =========================
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');

        handleSuccess('User Logged Out');

        setLoggedInUser('');
        setSitters(allSitters);

        navigate('/');
    };

    // =========================
    // SCROLL
    // =========================
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    const fallbackImages = [
    babysitterImage1,
    babysitterImage2,
    babysitterImage3,
    babysitterImage4,
    babysitterImage5
];
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

                <div className="nav-links">
                    <a href="#home"        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
                    <a href="#about"       onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
                    <a href="#find-sitter" onClick={(e) => { e.preventDefault(); scrollTo('find-sitter'); }}>Find Sitters</a>
                    <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>How it works</a>
                </div>

                <div className="nav-auth">
                    {loggedInUser ? (
                        <div className="user-section">
                            <div className="user-avatar">
                                {loggedInUser?.charAt(0).toUpperCase()}
                            </div>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <button className="nav-btn" onClick={() => navigate('/login')}>Log In</button>
                            <button className="nav-btn signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section className="hero" id="home">
                <div className="hero-left">
                    

                    <div className="trust-badge">
                        <span className="badge-dot">🛡</span> Bangladesh's Most Trusted Platform
                    </div>

                    <h1>
                        Find Trusted <br />
                        <span className="hero-highlight">Babysitters</span><br />
                        for Your Child
                    </h1>

                    <p className="hero-desc">
                        Connecting parents with verified and experienced babysitters
                        for a safe, reliable and happy childcare experience.
                    </p>

                    <div className="hero-buttons">
                        <button className="hero-btn primary" onClick={() => scrollTo('find-sitter')}>
                            🔍 Find a babysitter
                        </button>
                        <button
    className="hero-btn secondary"
    onClick={() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('loggedInUser');

        if (!user) {
            navigate('/signup');
        } else if (!token) {
            navigate('/login');
        } else {
            navigate('/create-profile');
        }
    }}
>
    👤 Become a sitter
</button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-pill"><span className="stat-dot green"></span> Verified Sitters</div>
                        <div className="stat-pill"><span className="stat-dot teal"></span> Safe Platform</div>
                        <div className="stat-pill"><span className="stat-dot blue"></span> 400+ Parents</div>
                    </div>
                </div>

                <div className="hero-right">
                    <img src={babysitterImage} alt="Babysitter with child" className="hero-image" />
                </div>
            </section>

           {/* ===== PROCESS SECTION ===== */}
            <section className="process-section" id="about">
                <p className="section-subtitle">Simple Process</p>
                <h3 className="section-title">Book in Three Easy Steps</h3>

                <div className="process-steps">
                    <div className="process-card">
                        <div className="process-icon">🔍</div>
                        <h4>Search & Filter</h4>
                        <p>Browse verified babysitters by location, budget, experience, and values. Use smart filters to find the perfect match.</p>
                    </div>
                    <div className="process-card">
                        <div className="process-icon">✔️</div>
                        <h4>Review & Verify</h4>
                        <p>Check verified profiles, certifications, parent reviews, and detailed background check results with trust badges.</p>
                    </div>
                    <div className="process-card">
                        <div className="process-icon">📅</div>
                        <h4>Book & Confirm</h4>
                        <p>Select date, time, and duration. Receive instant confirmation and direct contact details for the babysitter.</p>
                    </div>
                </div>
            </section>

            {/* ===== SEARCH SECTION ===== */}
<section className="search-section">

    <div className="search-box">

        {/* LOCATION */}
        <div className="search-item">
            <span className="search-label">Location</span>
            <input
                className="search-input"
                type="text"
                placeholder="Enter city or area"
                onChange={(e) => setLocation(e.target.value)}
            />
        </div>

        <div className="search-divider"></div>

        {/* PRICE */}
        <div className="search-item">
            <span className="search-label">Budget</span>

            <div className="price-group">
                <input
                    className="search-input"
                    type="number"
                    placeholder="Min"
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    className="search-input"
                    type="number"
                    placeholder="Max"
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
        </div>

        <button className="search-btn" onClick={handleSearch}>
            Search
        </button>

    </div>

</section>

            {/* ===== FEATURED BABYSITTERS ===== */}
<section className="babysitter-section" id="find-sitter">
    <p className="section-subtitle"></p>
    <h3 className="section-title">Featured Babysitters</h3>

    <div className="babysitter-cards">

        {/* LOADING STATE */}
        {loading ? (
            <p style={{ padding: "10px", color: "gray" }}>
                Loading babysitters...
            </p>

        ) : sitters.length === 0 ? (
            <p style={{ padding: "10px", color: "gray" }}>
                No babysitters found 😢
            </p>

        ) : (
            sitters.map((sitter, i) => (
                <div key={sitter._id} className="sitter-card">

                    {/* IMAGE */}
                    <img
                        src={sitter.image || fallbackImages[i % fallbackImages.length]}
                        alt={sitter.name}
                    />
                    
                    {/* VERIFIED BADGE */}
                    <span className="verified-badge">
                        ✓ Verified
                    </span>

                    {/* NAME */}
                    <h4>{sitter.name}</h4>

                    {/* LOCATION */}
                    <p className="sitter-location">
                        📍 {sitter.location}
                    </p>

                    {/* STARS */}
                    <p className="sitter-stars">
                        ⭐⭐⭐⭐⭐ <span>{sitter.rating || "4.5"}</span>
                    </p>

                    {/* PRICE */}
                    <div className="card-footer">
                        <span className="sitter-rate">
                            ৳{sitter.price} /hr
                        </span>

                        <button className="book-btn">
                            Book
                        </button>
                    </div>

                </div>
            ))
        )}

    </div>
</section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="testimonial-section" id="how-it-works">
                <p className="section-subtitle">Parent Stories</p>
                <h3 className="section-title">Trusted by 400+ Families</h3>

                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <p>"Nirapodsheba gave us complete peace of mind. Fatema is amazing with our 3 year old. The verification process made us confident from day one."</p>
                        <div className="testimonial-author">
                            <div className="author-avatar pink"></div>
                            <div>
                                <strong>Nasrin Akter</strong>
                                <div className="t-stars">⭐⭐⭐⭐⭐</div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <p>"The booking process is so simple and the babysitter profiles are very detailed. I could see certifications, reviews and everything. Totally trustworthy."</p>
                        <div className="testimonial-author">
                            <div className="author-avatar blue"></div>
                            <div>
                                <strong>Karim Uddin</strong>
                                <div className="t-stars">⭐⭐⭐⭐⭐</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VALUES SECTION ===== */}
            <section className="values-section">
                <h3>Raising Children with Moral Excellence</h3>
                <p>Our platform connects you with caregivers who understand the importance of ethical upbringing, and moral character development in children.</p>

                <div className="values-cards">
                    <div className="value-card">
                        <h4>Moral Character</h4>
                        <p>Teaching honesty, respect, kindness and ethical behavior from an early age.</p>
                    </div>
                    <div className="value-card">
                        <h4>Spiritual Care</h4>
                        <p>Nurturing a child's spiritual wellbeing alongside their physical safety.</p>
                    </div>
                    <div className="value-card">
                        <h4>Good Manners (Akhlaq)</h4>
                        <p>Teaching good manners, respect for elders, and kindness to friends using Islamic values.</p>
                    </div>
                </div>
            </section>

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
                        <p className="footer-desc">Bangladesh's most trusted babysitter booking platform. Verified, safe and aligned with your values.</p>
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
                            <li>Teams Of Service</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Nirapodsheba. All rights reserved.</p>
                    <p>Made with Nirapodsheba team for Bangladeshi Families</p>
                </div>
            </footer>

            <ToastContainer />
        </div>
    );
}

export default Home;