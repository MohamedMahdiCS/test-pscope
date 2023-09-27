import React, { useState } from 'react';
import AboutUs from "../AboutUs";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token"); // Check if the user is logged in

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    

    const PersonalityTestPage = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/personalityTestPage' } });
        } else {
            navigate('/personalityTestPage');
        }
    };
    const handleSuggestionsFeedbackPage = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/suggestions-feedback' } });
        } else {
            navigate('/suggestions-feedback');
        }
    };

    const contact = () => {
        navigate('/contactus');
    };
    
    const Login = () => {
        navigate('/login');
    };

    const Signup = () => {
        navigate('/signup');
    };

    const AboutUsPage = () => {
        navigate('/AboutUs');  // Directly navigate to AboutUs page
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.main_container}>
                <nav className={styles.navbar}>
                    <h1 style={{ fontFamily: 'Open Sans, sans-serif' }}>PersonaScope</h1>

                    {/* The menu button */}
                    <button onClick={toggleDropdown} className={styles.menuButton}>☰</button>

                    <div className={showDropdown ? styles.dropdownActive : styles.button_container}>
                        {isLoggedIn && (
                            <>
                                <button className={styles.white_btn} onClick={handleLogout}>
                                    Logout
                                </button>
                                <button className={styles.white_btn2} onClick={PersonalityTestPage}>
                                    Take your Personality Test
                                </button>
                            </>
                        )}
                        <button className={styles.white_btn2} onClick={AboutUsPage}>
                            About Us
                        </button>
                    </div>
                </nav>

                {!isLoggedIn && (
    <div className={styles.callToAction}>
        <h3>Discover Your True Self 🌟</h3>
        <p>Unlock the secrets of your personality. Join us now and take the comprehensive test!</p>
        <div className={styles.ctaButtons}>
            <button className={styles.loginBtn} onClick={Login}>Login</button>
            <button className={styles.signupBtn} onClick={Signup}>Sign Up</button>
        </div>
    </div>
)}
                <header className={styles.header}>
                    <img src="/Home.png" alt="Hero" className={styles.heroImage} />
                    <div className={styles.missionStatement}>
                        <h2>It's Our Mission To Make People's Life Easier.</h2>
                        <p>Let's get started with yours.</p>
                    </div>
                </header>

                
                <div className={styles.articleContent}>
                    {/* Rest of the article content (h3 sections and paragraphs) */}
                </div>
            </div>
            <footer className={styles.footer}>
    <div className={styles.footerLinks}>
        {isLoggedIn && (
            <span className={styles.footerLink} onClick={handleSuggestionsFeedbackPage}>
                Feedback
            </span>
        )}
        <span className={styles.footerLink} onClick={contact}>
            Contact Us
        </span>
    </div>
    <div className={styles.copyrightText}>
        © {new Date().getFullYear()} Personality Test Web App. All rights reserved.
    </div>
</footer>


        </div>
    );
};

export default Main;
