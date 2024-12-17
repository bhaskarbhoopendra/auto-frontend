import React from 'react';
import './ReturnExchange.css'; // Ensure this path is correct based on your folder structure
import Banner from '../Banner/Banner';
import Navbar1 from '../Nav1/Navbar';
import Navbar2 from '../Nav2/Navbar';
import Footer from '../Footer/Footer';

const ReturnAndExchanges = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Banner />
      <Navbar1 />
      <Navbar2 />
      <div className="return-exchanges-container">
        <h1>Returns & Exchanges</h1>
        <p>Enter your 5 digit order number and Phone or Email to find your order</p>
        
        <form>
          {/* Order Number */}
          <div className="form-group">
            <input type="text" placeholder="Order Number" required />
          </div>

          {/* Phone or Email */}
          <div className="form-group">
            <input type="text" placeholder="Phone or Email" required />
          </div>

          {/* Submit Button */}
          <button type="submit" className="find-order-btn">FIND YOUR ORDER</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ReturnAndExchanges;
