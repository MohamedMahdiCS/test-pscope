import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSmile, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const SuggestionsFeedback = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const [satisfaction, setSatisfaction] = useState("");
    const [experienceRating, setExperienceRating] = useState("");
    const [ageGroup, setAgeGroup] = useState("18-24");
    const [suggestion, setSuggestion] = useState("");
    const [showModal, setShowModal] = useState(false); // For error modal
    const [successMessage, setSuccessMessage] = useState("");
    
    


    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handlePersonalityTestPage = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/personalityTestPage' } });
        } else {
            navigate('/personalityTestPage');
        }
    };
    const contact = () => {
        navigate('/contactus');
    };
    const handleAboutUsPage = () => {
        navigate('/AboutUs');
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    
    

    const handleFeedbackSubmit = async () => {
        if (!satisfaction || !experienceRating || !suggestion) {
            setShowModal(true);  // Show the modal if fields are empty
            return;
        }
    
        try {
            const url = "http://localhost:8080/api/feedbackRoutes";  // Replace this URL with your actual backend endpoint


            const payload = {
                ageGroup,
                satisfaction,
                experienceRating,
                suggestion,
            };
    
            const token = localStorage.getItem("token");
    
            if(!token) {
                // Handle not logged in
                console.error("User not logged in");
                return;
            }
            
            // Send POST request to the backend
            const { data: res } = await axios.post(url, payload, {
                headers: {
                    'x-auth-token': token
                }
            });
    
            console.log("Feedback submitted successfully:", res);
            setSuccessMessage("Your feedback has been successfully submitted!");

            // You can add any success handling logic here (e.g., set some state to show a success message)
            
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                console.error("An error occurred:", error.response.data.message);
                // You can add any error handling logic here (e.g., set some state to show an error message)
            } else {
                console.error("An unknown error occurred:", error);
            }
        }
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>PersonaScope</h1>
                </Link>
                <button onClick={toggleDropdown} className={styles.menuButton}>☰</button>
                <div className={showDropdown ? styles.dropdownActive : styles.button_container}>
                    {isLoggedIn && (
                        <>
                            <button className={styles.white_btn} onClick={handleLogout}>
                                Logout
                            </button>
                            <button className={styles.white_btn2} onClick={handlePersonalityTestPage}>
                                Take your Personality Test
                            </button>
                        </>
                    )}
                    <button className={styles.white_btn2} onClick={handleAboutUsPage}>
                        About Us
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className={styles.main_container}>
                <header className={styles.header}>
                    <img src="feedHeader.png" alt="Header Background" className={styles.headerBackground} />
                </header>

                {/* Survey Form */}
                <div className={styles.surveyForm}>
                    <h2>We'd love to hear your feedback!</h2>

                    <label><FontAwesomeIcon icon={faUser} /> How old are you? <span className={styles.requiredStar}>*</span></label>
                    <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value=">35">More than 35</option>
                    </select>

                    <label><FontAwesomeIcon icon={faSmile} /> Are you satisfied with our personality test? <span className={styles.requiredStar}>*</span></label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input type="radio" value="Very Satisfied" name="satisfaction" onChange={(e) => setSatisfaction(e.target.value)} />
                            Very Satisfied
                        </label>
                        <label>
                            <input type="radio" value="Satisfied" name="satisfaction" onChange={(e) => setSatisfaction(e.target.value)} />
                            Satisfied
                        </label>
                        <label>
                            <input type="radio" value="Neutral" name="satisfaction" onChange={(e) => setSatisfaction(e.target.value)} />
                            Neutral
                        </label>
                        <label>
                            <input type="radio" value="Unsatisfied" name="satisfaction" onChange={(e) => setSatisfaction(e.target.value)} />
                            Unsatisfied
                        </label>
                        <label className="custom-radio">
                        <input type="radio" value="Very Satisfied" name="satisfaction" onChange={(e) => setSatisfaction(e.target.value)} />
                        Very Satisfied
                    </label>
                    </div>

                    <label><FontAwesomeIcon icon={faStar} /> How would you rate your experience? <span className={styles.requiredStar}>*</span></label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input type="radio" value="0" name="experience" onChange={(e) => setExperienceRating(e.target.value)} />
                            0
                        </label>
                        <label>
                            <input type="radio" value="1" name="experience" onChange={(e) => setExperienceRating(e.target.value)} />
                            1
                        </label>
                        <label>
                            <input type="radio" value="2" name="experience" onChange={(e) => setExperienceRating(e.target.value)} />
                            2
                        </label>
                        <label>
                            <input type="radio" value="3" name="experience" onChange={(e) => setExperienceRating(e.target.value)} />
                            3
                        </label>
                        <label>
                            <input type="radio" value="4" name="experience" onChange={(e) => setExperienceRating(e.target.value)} />
                            4
                        </label>
                        <label>
                            <input type="radio" value="5" name="experience" onChange={(e) => setExperienceRating(e.target.value)} />
                            5
                        </label>
                        {/* Add other numbers here */}
                    </div>


                <div className="textareaContainer">
                <label className="labelWithSpacing">
                <FontAwesomeIcon icon={faUser} /> Do you have any suggestions to improve your experience with our personality test? <span className={styles.requiredStar}>*</span>
                    </label>
                    <textarea 
                        placeholder="Your feedback is valuable to us. Feel free to share your thoughts here."
                        value={suggestion} 
                        onChange={(e) => setSuggestion(e.target.value)}
                    ></textarea>
                </div>

                    <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
                    {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

                </div>
            </div>

            
            {/* Error Modal */}
            {showModal && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
                                <p>All fields are required!</p>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <footer className={styles.footer}>
    <div className={styles.footerLinks}>
        <span className={styles.footerLink} onClick={contact}>
            Contact Us
        </span>
    </div>
    © {new Date().getFullYear()} Personality Test Web App. All rights reserved.
</footer>
                </div>
            );
};

export default SuggestionsFeedback;
