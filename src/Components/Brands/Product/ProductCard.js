import React from "react";
import "./ProductCard.css";
import { Star } from "lucide-react";
import { useAddToCartMutation } from "../../../features/cartSlice";
import { formatCurrency } from "../../../util/currencyFormatter";

const ProductCard = ({ product }) => {
  const [addToCart, { isLoading, error }] = useAddToCartMutation();

  const handleAddToCart = async (product) => {
    const productId = product._id;
    const quantity = 1;
    const user = JSON.parse(localStorage.getItem("user"));

    const userId = user?.id;
    await addToCart({ productId, quantity, userId });
  };
  return (
    <div className="pc-product-card">
      <div className="pc-save-badge">Save Rs. 61.00</div>
      <div className="pc-product-image">
        {/* Replace with actual image */}
        <img src={product?.images[0]} alt="Honda Front Brake Disc Caliper" />
      </div>
      <div className="pc-price-section">
        <span className="pc-current-price">
          {formatCurrency(product?.price)}
        </span>
        <span className="pc-original-price">Rs. 90.00</span>
      </div>
      <h3 className="pc-product-title">{product?.name}</h3>
      <div className="pc-brand">Bajaj</div>
      <div className="pc-rating">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#9333ea" />
          ))}
        </div>
        <span className="pc-review-count">5 reviews</span>
      </div>
      <div className="pc-stock-status">
        <span className="pc-stock-dot"></span>
        <span className="pc-stock-text">In Stock</span>
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="pc-add-to-cart"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
