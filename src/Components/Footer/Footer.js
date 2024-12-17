import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: "3rem", backgroundColor: "#f8f8f8", borderTop: "1px solid #ddd", marginTop: "-68px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
        {/* Column 1: Important Links */}
        <div style={{ flex: "1 1 20%" }}>
          <h4 style={{ marginBottom: "1rem" }}>Important Links</h4>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Home</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>About Us</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Contact</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>FAQ</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Support</a></li>
          </ul>
        </div>
        
        {/* Column 2: Policy */}
        <div style={{ flex: "1 1 20%" }}>
          <h4 style={{ marginBottom: "1rem" }}>Policy</h4>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Privacy Policy</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Return Policy</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Terms of Service</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Shipping Information</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Payment Methods</a></li>
          </ul>
        </div>
        
        {/* Column 3: Brand */}
        <div style={{ flex: "1 1 20%" }}>
          <h4 style={{ marginBottom: "1rem" }}>Brand</h4>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Hero</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Honda</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>TVS</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Yamaha</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>KTM</a></li>
          </ul>
        </div>
        
        {/* Column 4: Follow Us */}
        <div style={{ flex: "1 1 20%" }}>
          <h4 style={{ marginBottom: "1rem" }}>Follow Us</h4>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Facebook</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Twitter</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>Instagram</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>LinkedIn</a></li>
            <li><a href="#" style={{ textDecoration: "none", color: "#333" }}>YouTube</a></li>
          </ul>
        </div>
        
        {/* Column 5: Copyright */}
        <div style={{ flex: "1 1 20%" }}>
          <p style={{ fontSize: "0.9rem", color: "#555", margin: "0" }}>
            By entering your email, you agree to receive special offers, promotion, and commercial messages. You may unsubscribe at any time.<br />
            Copyright @ 2024 Auto Part Wala. All rights reserved.
          </p>
        </div>
      </div>
      <div style={{display:"flex", gap:"12px", padding: "1rem 0"  }}>
        <h5>Products</h5>
          <p style={{ fontSize: "0.9rem", color: "#555"}}>
            We are dedicated to providing you with the best products and services. Our mission is to offer quality and value, ensuring customer satisfaction with every purchase.
          </p>
        </div>
    </footer>
  );
}

export default Footer;
