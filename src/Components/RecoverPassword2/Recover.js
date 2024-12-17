import React, { useState } from 'react';
import './Recover.css'; // For custom styles

function RecoverPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling password reset
  };

  return (
    <div className="recover-container">
      <div className="recover-box">
        <h2>Recover Password</h2>
        <p>Enter a new password for your account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input 
              type="password" 
              name="newPassword" 
              value={formData.newPassword} 
              onChange={handleChange} 
              required 
              placeholder=" " 
            />
            <label htmlFor="newPassword">New Password</label>
          </div>

          <div className="input-container">
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              placeholder=" " 
            />
            <label htmlFor="confirmPassword">Confirm New Password</label>
          </div>

          <button type="submit" className="recover-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
