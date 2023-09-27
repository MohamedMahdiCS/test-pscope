import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';  // <-- Import Link for navigation
import axios from 'axios';
import './VerifyEmail.css';  // Import your CSS if you have one

function VerifyEmail() {
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const { token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/users/verify/${token}`);
                console.log(res.data);
                setVerificationStatus('Email successfully verified!');
            } catch (error) {
                console.log("Email verification failed", error);
                setVerificationStatus('Email verification failed. Please try again.');
            }
        };
        verifyEmail();
    }, [token]);

    return (
        <div className="verify-email-container">
            <h1 className="verify-email-title">Email Verification</h1>
            <p className="verify-email-status">{verificationStatus}</p>
            <Link to="/login" className="back-to-login">Back to Login</Link>
        </div>
    );
}

export default VerifyEmail;
