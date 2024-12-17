import React from 'react';
import './Wholesale.css'; // Assuming you want separate styling in a CSS file

const WholesaleSignUpForm = () => {
  return (
    <div className='form-bg'> 
      <div className="form-container">
        <h1>Wholesale Sign-up Form</h1>
        <p>Wholesale discount for shop owners, mechanic brothers, and service centers</p>
        
        <form>
          {/* First Name */}
          <div className="form-group">
            <label>First Name <span className="required">*</span></label>
            <input type="text" required placeholder="Enter your first name" />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" required placeholder="Enter your last name" />
          </div>

          {/* Mobile No */}
          <div className="form-group">
            <label>Mobile No <span className="required">*</span></label>
            <input type="text" required placeholder="Enter your mobile number" />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Lead Email <span className="required">*</span></label>
            <input type="email" required placeholder="Enter your email" />
          </div>

          {/* Pin Code */}
          <div className="form-group">
            <label>Pin Code <span className="required">*</span></label>
            <input type="text" required placeholder="Enter your pin code" />
          </div>

          {/* GST No */}
          <div className="form-group">
            <label>GST No</label>
            <input type="text" placeholder="Enter your GST number" />
          </div>

          {/* Required Fields Note */}
          <p className="required-note">
            <span className="required">*</span> Required fields
          </p>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Join Now</button>
        </form>
      </div>
    </div>
  );
};

export default WholesaleSignUpForm;
