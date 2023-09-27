import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Importing Font Awesome icons

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [signedUp, setSignedUp] = useState(false);  // <-- Add this line
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const url = "http://localhost:8080/api/users";
          const { data: res } = await axios.post(url, data);
          setSignedUp(true);  // <-- Add this line to indicate successful signup
          setTimeout(() => {
            navigate("/login"); // Redirect to login page after a short delay
          }, 2000); // Delay in milliseconds (2000ms = 2 seconds)
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            // Check if the error is due to email already being in use
            if (error.response.data.message === "User with given email already exists!") {
              setError("The email you've entered is already associated with an account.");
            } else {
              setError(error.response.data.message);
            }
          } else {
            setError("An unexpected error occurred.");
          }
        }
      };

	return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <div className={styles.inputGroup}>
                            <FaUser />
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <FaUser />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                value={data.lastName}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <FaLock />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                        </div>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            {signedUp && (
                <div className={styles.success_msg}>
                    Your account has been created. Please check your email to verify your account.
                </div>
            )}
        </div>
    );
    
};

export default Signup;
