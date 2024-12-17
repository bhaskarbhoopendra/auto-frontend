import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "./Login.css";
import googleicon from "./google_icon-icons.webp";
import axiosInstance from "../../api/axiosInstance";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      try {
        const response = await axiosInstance.post(
          "/users/admin/login",
          formData
        );
        console.log(response.data.data);
        const { tokens, user } = response.data.data;

        // Save tokens in localStorage
        localStorage.setItem("accessToken", tokens?.accessToken);
        localStorage.setItem("refreshToken", tokens?.refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to dashboard
        navigate("/");
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <p>Please enter your email and password</p>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              id="email"
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
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="or-divider">
          <span className="line"></span>
          <span className="or-text">OR</span>
          <span className="line"></span>
        </div>

        <button className="google-btn">
          <img src={googleicon} alt="Google icon" className="google-icon" />{" "}
          {/* Use the imported Google icon */}
          Continue with Google
        </button>

        <p className="forgot-text">
          Forgot password?{" "}
          <Link to="/recover" className="recover-link">
            Recover password
          </Link>
        </p>

        <p className="new-account-text">
          New to Auto Part Wala?{" "}
          <Link to="/register" className="register-link">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
