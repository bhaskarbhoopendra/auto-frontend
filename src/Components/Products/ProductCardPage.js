import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectProductsByCategory } from "../../store/productSlice";
import "./ProductCardPage.css";
import RecentlyViewedProducts from "../RecentViewedProducts/RecentViewedProducts";
import ReviewForm from './ReviewForm/ReviewForm'; // Adjust the import path as necessary

const ProductCardPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const location = useLocation();
  const { productIndex, category } = location.state; // Passed from the product list
  const productsData =[]

  const [showDescription, setShowDescription] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [showSpecialFeatures, setShowSpecialFeatures] = useState(false);
  const [showBrandInfo, setShowBrandInfo] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // New state for review handling
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component loads
  }, []);

  // Fetch recently viewed products from localStorage
  useEffect(() => {
    const viewedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(viewedProducts); // Set all recently viewed products
  }, []);

  // Add current product to recently viewed list in localStorage
  useEffect(() => {
    if (productsData && productsData.products && productIndex < productsData.products.length) {
      const viewedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      const currentProduct = productsData.products[productIndex];

      // Avoid adding duplicates and store up to 10 recently viewed products
      const updatedViewedProducts = [currentProduct, ...viewedProducts.filter(product => product.id !== currentProduct.id)];
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewedProducts.slice(0, 10)));
      setRecentlyViewed(updatedViewedProducts);
    }
  }, [productsData, productIndex]);

  if (!productsData || !productsData.products) {
    return <div>Loading...</div>;
  }

  if (productIndex >= productsData.products.length) {
    return <div>Product not found.</div>;
  }

  const product = productsData.products[productIndex];

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const reviewData = { text: reviewText, rating: reviewRating };
    console.log(reviewData); // Log or handle the review data
    // Reset form fields after submission
    setReviewText('');
    setReviewRating(0);
    setShowReviewForm(false);
  };

  return (
    <div className="product-card-page">
      <div className="product-details-container">
        <div className="product-image">
          <img src={product.img} alt={product.name} style={{ width: "100%", height: "auto" }} />
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <div className="rating-reviews">
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: i < product.rating ? "#F6BE00" : "#D3D3D3", fontSize: "1.5rem" }}>★</span>
            ))}
            <p>(Reviews)</p>
          </div>

          <div className="price-section">
            <p className="price">{product.price}</p>
            <p className="mrp">MRP: {product.MRP}</p>
          </div>

          <p className="save">{product.save}</p>
          <div className="vehicle-compatibility">
            <p>Vehicle Compatibility: (Display details)</p>
          </div>

          <div className="cart-wishlist">
            <button className="add-to-cart">Add to Cart</button>
            <span className="wishlist-icon">♡</span>
          </div>

          <div className="dropdown-section">
            <div onClick={() => setShowDescription(!showDescription)} className="dropdown">
              <h4>Description <i className={`fas fa-chevron-${showDescription ? "up" : "down"}`}></i></h4>
              {showDescription && <p>{product.description}</p>}
            </div>

            <div onClick={() => setShowProductInfo(!showProductInfo)} className="dropdown">
              <h4>Product Info <i className={`fas fa-chevron-${showProductInfo ? "up" : "down"}`}></i></h4>
              {showProductInfo && <p>Details about the product...</p>}
            </div>

            <div onClick={() => setShowSpecialFeatures(!showSpecialFeatures)} className="dropdown">
              <h4>Special Features <i className={`fas fa-chevron-${showSpecialFeatures ? "up" : "down"}`}></i></h4>
              {showSpecialFeatures && <p>Special features of the product...</p>}
            </div>

            <div onClick={() => setShowBrandInfo(!showBrandInfo)} className="dropdown">
              <h4>Brand Info <i className={`fas fa-chevron-${showBrandInfo ? "up" : "down"}`}></i></h4>
              {showBrandInfo && <p>Brand information...</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Review Section */}
      <div className="customer-review-section">
        <h3 style={{ textAlign: "center" }}>Customer Reviews</h3>
        <div className="customer-review-button-container">
          <button 
            style={{ cursor: "pointer", padding: '0.5rem 5rem', backgroundColor: "transparent", borderRadius: "6px", marginTop: "6px" }} 
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Write a Review
          </button>
        </div>
        
        {showReviewForm && (
          <ReviewForm product={product} handleReviewSubmit={handleReviewSubmit} />
        )}
      </div>

      {/* Example Customer Review Display */}
      <div className="customer-review">
        <img src="https://th.bing.com/th?id=OIP.LfBtLCx5jWjmzpI_LDs5TwHaL-&w=196&h=317&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=" alt="Customer" style={{ borderRadius: "50%", width: "50px", height: "50px" }} />
        <p style={{ fontWeight: "800" }}>John Doe</p>
        <p style={{ marginLeft: "10px" }}>Verified Reviewer</p>
      </div>

      <div>
        <div>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: i < reviewRating ? "#F6BE00" : "#D3D3D3" }}>★</span>
          ))}
        </div>
        <p style={{ textAlign: "left" }}>{reviewText}</p> {/* Display the review text */}
      </div>

      <div style={{ textAlign: "left" }}>
        <h4>Very good quality</h4>
        <p style={{ lineHeight: "2.5rem" }}>Here’s some distraction text to engage the reader further.</p>
        <img src={product.img} alt={product.name} style={{ width: "8%", height: "auto" }} />
      </div>

      {/* Recently Viewed Products Section */}
      <RecentlyViewedProducts recentlyViewed={recentlyViewed} /> {/* Pass recentlyViewed here */}
    </div>
  );
};

export default ProductCardPage;
