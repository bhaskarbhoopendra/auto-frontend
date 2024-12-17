import React, { useState } from 'react';
import './ReviewForm.css';
import googleicon from "./google_icon-icons.webp"; // Import the Google image icon

const ReviewForm = ({ product, handleReviewSubmit }) => {
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleReviewSubmit({ reviewTitle, reviewText, name, email });
    // Clear the form after submission if needed
    setReviewTitle('');
    setReviewText('');
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: '20px'}}>
      <h1 style={{ textAlign: 'center' }}>Write a Review</h1>

      <div className="product-info" style={{ margin: '20px 0', display:"flex" }}>
        <img src={product.img} alt={product.name} style={{ width: "50px", height: "50px", marginRight: '20px' }} />
        <div>
          <h4 style={{ margin: 0 }}>{product.name}</h4>
          <div>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: i < product.rating ? "#F6BE00" : "#D3D3D3" }}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          placeholder="Review Title"
          style={{ width: '100%', padding: '10px' }}
          required
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder={`What did you think about ${product.name}?`}
          rows="4"
          style={{ width: '100%', padding: '10px' }}
          required
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label htmlFor="add-photos">Add Photos:</label>
        <input type="file" id="add-photos" style={{ display: 'block', marginTop: '5px' }} />
      </div>

      <h4>Your Profile</h4>
      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ width: '100%', padding: '10px' }}
          required
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          style={{ width: '100%', padding: '10px' }}
          required
        />
      </div>

      <div className="or-divider" style={{ textAlign: 'center', margin: '20px 0' }}>
        <span className="line" style={{ display: 'inline-block', width: '40%', borderBottom: '1px solid #000', margin: '0 10px' }}></span>
        <span className="or-text">OR</span>
        <span className="line" style={{ display: 'inline-block', width: '40%', borderBottom: '1px solid #000', margin: '0 10px' }}></span>
      </div>

      <div className="button-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button type="button" className="sign-in-button">Sign In</button>
        <button className="google-btn">
          <img src={googleicon} alt="Google icon" className="google-icon" /> {/* Use the imported Google icon */}
          Continue with Google
        </button>
        <p style={{ marginTop: '20px' }}>
        By continuing, you agree to our <a href="/privacy-policy" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
      </p>

      <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#000', color: '#fff' }}>Agree and Submit</button>
      </div>

     
    </form>
  );
};

export default ReviewForm;
