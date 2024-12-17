// src/components/Navbar/Navbar.js
import React from "react";
import "./Navbar.css"; // Ensure to import the CSS file
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { useDispatch, useSelector } from "react-redux"; // Import hooks from react-redux
import { toggleCart, selectCartItems } from "../../store/cartSlice"; // Import actions and selectors
import cartImage from "./download (1).png"; // Import your cart image

function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const dispatch = useDispatch(); // Initialize useDispatch for dispatching actions
  const cartItems = []; // Select cart items from the Redux store

  const user = JSON.parse(localStorage.getItem("user"));
  console.log({ user });

  // Calculate total items in the cart
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0);

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Redirect to the specified path
  };

  // Function to handle login button click
  const handleLoginClick = () => {
    navigate("/login"); // Redirect to login page
  };

  // Function to handle cart icon click
  const handleCartClick = () => {
    dispatch(toggleCart()); // Toggle cart sidebar visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div>
        <div className="logo" onClick={() => navigate("/")}>
          <h1>
            <span style={{ fontSize: "2rem" }}>A</span>uto{" "}
            <span style={{ color: "purple" }}>Part</span> Wala
          </h1>

          <img
            src="https://th.bing.com/th/id/R.6616a20733cb5b1cb260be1ce898f936?rik=%2bhe%2fB%2bBFT0%2fvNA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fwheel-png-hd-wheel-rim-png-hd-700.png&ehk=PsxAq10vlR%2ft%2fp%2f6a%2f0beqwdrrsO876t3LkkSbEH8Jg%3d&risl=&pid=ImgRaw&r=0"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Line Divider */}
          <div
            style={{
              borderBottom: "2px solid black", // Changed to border-bottom for a horizontal line
              width: "4vw",
            }}
          ></div>

          {/* Text */}
          <p
            style={{
              fontWeight: "700",
              fontSize: "0.8rem",
              fontStyle: "italic",
            }}
          >
            Your One-Stop Auto Parts Shop
          </p>
        </div>
      </div>

      {/* Links Section */}
      <ul className="nav-links">
        <li onClick={() => handleNavigation("/wholesale")}>Wholesale prices</li>
        <li onClick={() => handleNavigation("/about")}>About Us</li>
        <li onClick={() => handleNavigation("/return")}>Returns & Exchange</li>
        <li onClick={() => handleNavigation("/order-tracking")}>
          Order Tracking
        </li>
        <li onClick={() => handleNavigation("/faqs")}>FAQs</li>
        <li onClick={() => handleNavigation("/blogs")}>Blogs</li>
      </ul>

      {/* Search and Login Section */}
      <div className="search-login">
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search here"
            style={{
              width: "100%",
              padding: "10px 40px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        {user?.id ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                fontSize: "16px",
              }}
            >
              Welcome, {user.firstName}!
            </p>
            <button
              style={{ marginLeft: "8px" }}
              className="login-btn"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={handleLoginClick}>
            Login
          </button>
        )}

        {/* <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button> */}
      </div>

      {/* Cart Section */}
      <div
        className="cart"
        style={{ cursor: "pointer", position: "relative" }}
        onClick={handleCartClick}
      >
        <img src={cartImage} alt="cart icon" className="cart-icon" />
        <span>Cart</span>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
    </nav>
  );
}

export default Navbar;
