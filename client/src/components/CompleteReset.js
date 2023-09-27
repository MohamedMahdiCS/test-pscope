import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const CompleteReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !newPassword) {
      setMessage("Token and new password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/completeReset", { token, newPassword });
      setMessage(response.data);
    } catch (error) {
      const serverMessage = error.response && error.response.data ? error.response.data : "An error occurred. Please try again.";
      setMessage(serverMessage);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Complete Password Reset</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      <button onClick={handleGoToLogin} style={buttonStyle}>Go to Login</button> {/* Added button */}
    </div>
  );
};

export default CompleteReset;
