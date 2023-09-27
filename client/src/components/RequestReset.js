import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
    marginBottom: "10px",
  };

  const linkStyle = {
    ...buttonStyle, // Spreading the buttonStyle to reuse those styles
    textDecoration: "none",
    textAlign: "center",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/initiateReset", { email });
      setMessage(response.data);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Request Password Reset</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
};

export default RequestReset;
