import React, { useState } from 'react';
import './Recover.css'; // For custom styles
import googleicon from "./google_icon-icons.webp"; // Import the Google image icon

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email) {
      setError('Email is required');
    } else {
      setError('');
      // Handle successful form submission logic here
      console.log('Email submitted:', email);
    }
  };

  return (
    <div className="recover-container">
      <div className="recover-box">
        <h2>Recover Password</h2>
        <p>Please enter your email</p>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" className="recover-button">Recover</button>
        </form>

        <div className="or-divider">
          <div className="line"></div>
          <p className="or-text">OR</p>
          <div className="line"></div>
        </div>

        <button className="google-btn">
        <img src={googleicon} alt="Google icon" className="google-icon" /> {/* Use the imported Google icon */}
        Continue with Google
        </button>

        <p className="login-text">
          Remember your password?{' '}
          <a href="/login" className="login-link">Back to Log In</a>
        </p>
      </div>
    </div>
  );
}

export default RecoverPassword;
