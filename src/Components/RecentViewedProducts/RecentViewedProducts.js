import React from 'react';
import './RecentViewedProducts.css'; // Import your CSS file

const RecentlyViewedProducts = ({ recentlyViewed }) => {
  return (
    <div className="recently-viewed-products">
      <h3 style={{ textAlign: "center" }}>Recently Viewed Products</h3>
      <div className="recent-products-container">
        {recentlyViewed.map((recentProduct, index) => (
          <div key={index} className="product-card">
            <img src={recentProduct.img} alt={recentProduct.name} />
            <p>{recentProduct.name}</p>
            <p className="price">{recentProduct.price}</p>
            <p className="mrp">MRP: {recentProduct.MRP}</p>
            <p className="save">{recentProduct.save}</p>
            <p className="vehicle-compatibility">Vehicle Compatibility: {recentProduct.vehicleCompatibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
