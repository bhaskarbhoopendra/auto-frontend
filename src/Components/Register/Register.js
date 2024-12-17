import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Register.css';
import googleicon from "./google_icon-icons.webp";
import axiosInstance from '../../api/axiosInstance';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Create navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    let validationErrors = {};
    if (!formData.firstName) validationErrors.firstName = 'First Name is required';
    if (!formData.lastName) validationErrors.lastName = 'Last Name is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      try {
        const response = await axiosInstance.post('/users/admin/createuser', formData);
        const { accessToken, refreshToken } = response.data;

        // Save tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };


  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <p>Please fill in the fields below:</p>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              placeholder=" " 
            />
            <label htmlFor="firstName">First Name</label>
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>

          <div className="input-container">
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              placeholder=" " 
            />
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>

          <div className="input-container">
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder=" " 
            />
            <label htmlFor="email">Email</label>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-container">
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder=" " 
            />
            <label htmlFor="password">Password</label>
            {errors.password && <p className="error-message">{errors.password}</p>}
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>

        <div className="checkbox-container">
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter" style={{ fontSize: "0.9rem", fontWeight: "400" }}>
            Yes, I want to subscribe to the newsletter now
          </label>
        </div>

        <div className="or-divider">
          <span className="line"></span>
          <span className="or-text">OR</span>
          <span className="line"></span>
        </div>

        <button className="google-btn">
        <img src={googleicon} alt="Google icon" className="google-icon" /> {/* Use the imported Google icon */}
        Continue with Google
        </button>

        <p className="login-text">
          Do you already have an account?{' '}
          <a href="/login" className="login-link">Back to Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
