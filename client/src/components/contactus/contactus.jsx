import React, { useState } from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faTag, faComment, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom if you're using it
import axios from 'axios';

const ContactUs = () => {
  const [emailSent, setEmailSent] = useState(false);  // Step 2
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    
    const formData = {
      name,
      email,
      subject,
      message
    };
    
    try {
      const response = await axios.post("http://localhost:8080/api/users/contact", formData);
      console.log(response.data);
      setEmailSent(true);  // Step 3
    } catch (error) {
      console.error("Error sending contact form:", error);
      setEmailSent(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Navbar (You can include your Navbar component here) */}
      
      <div className={styles.main_container}>
        <header className={styles.header}>
          <img src="feedbackback.png" alt="Header Background" className={styles.headerBackground} />
        </header>
        
        <div className={styles.contentWrapper}>
          <div className={styles.leftText}>
            <h1>Get in Touch with Us</h1>
            <p>Have questions about our services or want to discuss your project? Fill out the form to request a call back.
            </p>
            <p>
              personascope88@gmail.com
            </p>
          </div>
          
          <div className={styles.surveyForm}>
            <h2>We'd Love To Hear From You!</h2>

              {/* Show prompt if email is sent */}
          {emailSent && <p className={styles.successMsg}>Your email has been sent successfully!</p>}
          {/* Show error message if email couldn't be sent */}
          {!emailSent && emailSent !== false && <p className={styles.errorMsg}>Could not send your email. Please try again.</p>}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faUser} /> Name
                  <span className={styles.requiredStar}>*</span>
                </label>
                <input type="text" id="name" required />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                  <span className={styles.requiredStar}>*</span>
                </label>
                <input type="email" id="email" required />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faTag} /> Subject
                  <span className={styles.requiredStar}>*</span>
                </label>
                <input type="text" id="subject" required />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faComment} /> Message
                  <span className={styles.requiredStar}>*</span>
                </label>
                <textarea id="message" rows="4" required></textarea>
              </div>
              <div className={styles.buttonContainer}>
              <Link to="/" className={styles.goBackBtn}>Go Back</Link>
              <button type="submit" className={styles.submitBtn}>Submit</button>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Footer (You can include your Footer component here) */}
    </div>
  );
};

export default ContactUs;
