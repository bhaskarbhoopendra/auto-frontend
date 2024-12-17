import React from 'react';
import './OrderTracking.css'; // Import the CSS file for styling
import Banner from '../Banner/Banner';
import Navbar1 from '../Nav1/Navbar';
import Navbar2 from '../Nav2/Navbar';
import Footer from '../Footer/Footer';

const OrderTracking = () => {
  return (
    <div>
      <Banner />
      <Navbar1 />
      <Navbar2 />

      <div className="container"> {/* Flexbox container for centering */}
        <div>
          <div className="logo">
            <img src="" alt="Auto Part Logo" />
          </div>
        </div>

        <div className='bd'>
          <div className="input-group">
            <label htmlFor="emailPhone">Email / Phone #</label>
            <input type="text" id="emailPhone" placeholder="johndoe@somesite.com" required />
            <p>Please provide your Phone number or email id.</p>
          </div>

          <div className="input-group">
            <label htmlFor="orderNumber">Order #</label>
            <input type="text" id="orderNumber" placeholder="e.g: 1001" required />
            <p>Please provide the order number of the order to be tracked.</p>
          </div>

          <button className="fetch-details-button">FETCH DETAILS</button>
        </div>
      </div>

      <Footer /> {/* Correctly placing the Footer component */}
    </div>
  );
};

export default OrderTracking;
