import React, { useState } from 'react';
import styles from './AboutUs.module.css';
import { Link, useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const [menuActive, setMenuActive] = useState(false);

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

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div className={styles.pageWrapper}>
            <nav className={styles.navbar}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>PersonaScope</h1>
                </Link>
                
                <div className="hamburger" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className={`collapsible-content ${menuActive ? 'active' : ''}`}>
    {isLoggedIn ? (
        <>
            <button className={styles.white_btn} onClick={handleLogout}>
                Logout
            </button>
            <button className={styles.white_btn2} onClick={PersonalityTestPage}>
                Take your Personality Test
            </button>
        </>
    ) : (
        <>
            <button className={styles.white_btn2} onClick={Login}>
                Login
            </button>
            <button className={styles.white_btn2} onClick={Signup}>
                Sign Up
            </button>
        </>
    )}
</div>
            </nav>

            <div className={styles.aboutWrapper}>
                <header className={styles.aboutHeader}>
                    <h1>About PersonaScope</h1>
                </header>
                <section className={styles.section}>
                    <h2>The Purpose of Our Test</h2>
                    <p>
                    At PersonaScope, our primary goal is to assist university students in grasping a deeper understanding of their academic and personal inclinations. Through our rigorously designed assessment, students gain insights into their academic strengths, areas of improvement, motivations, and potential career trajectories.

                    </p>
                </section>
                <section className={styles.section}>
                    <h2>The Science Behind It</h2>
                    <p>
                    Our academic and personal assessment for university students is grounded in rigorous educational and psychological research. It is curated by leading experts in the academic and counseling sectors. We meld various theories of learning styles, motivations, and personality to offer students a holistic understanding of their academic and personal tendencies.
                    </p>
                </section>
                <section className={styles.section}>
                    <h2>Our Commitment to Students</h2>
                    <p>
                    At PersonaScope, we recognize that university life is a transformative period filled with unique challenges and opportunities. Beyond the lectures and exams, it's a time of personal growth, identity formation, and discovering one's passion and purpose.

Our team comprises dedicated professionals, from academic advisors to trained psychologists, all united by a common goal: to support students in their journey. We believe in empowering students with tools and insights that can not only help them succeed academically but also flourish personally.

We are continuously refining our tools, collaborating with institutions, and seeking feedback from students to ensure we remain at the forefront of student-centric support. Our commitment is unwavering: to provide university students with the best resources and guidance to navigate their academic and personal lives with confidence and clarity.
                    </p>
                </section>
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

export default AboutUs;
