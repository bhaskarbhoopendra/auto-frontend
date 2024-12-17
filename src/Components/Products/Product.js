// src/components/Product/Product.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProductsByCategory } from "../../store/productSlice.js";
import { addItem } from "../../store/cartSlice"; // Import addItem action
import { useNavigate } from "react-router-dom";
import "./Product.css";
import { useGetAllProductsQuery } from "../../features/ProductSlice.js";

const Product = ({ dataKey }) => {
  const productsData = [];
  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log({ data });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    console.log(`${product.name} added to cart`);
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "-42px",
        }}
      >
        <h3
          style={{
            textAlign: "left",
            marginBottom: "1.5rem",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}
        >
          {productsData?.name || "Product Title"}
        </h3>
        <h6
          onClick={() => {
            console.log("Navigating to /carburetor with category:", dataKey);
            navigate("/carburetor", { state: { category: dataKey } });
          }}
          style={{
            fontSize: "0.9rem",
            fontWeight: "700",
            cursor: "pointer",
            color: "#8146CC",
          }}
        >
          View all
        </h6>
      </div>

      <div className="flex-container">
        {productsData.map((product, index) => (
          <div
            key={product._id || index}
            className="product-container"
            onClick={() => {
              console.log(
                "Navigating to /product-card with productIndex:",
                index,
                "and category:",
                dataKey
              );
              navigate("/product-card", {
                state: { productIndex: index, category: dataKey },
              });
            }}
          >
            <div className="ImageTag">{product.save}</div>
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: "100%", height: "180px", objectFit: "contain" }}
            />
            <h1
              style={{
                marginTop: "0.5rem",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              {product.name}
            </h1>
            <div style={{ display: "flex", marginTop: "0.5rem" }}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < product.rating ? "#F6BE00" : "#D3D3D3",
                    fontSize: "1.5rem",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <div>
              <p className="price" style={{ fontSize: "1.2rem" }}>
                ₹{product.price}
              </p>
              <p className="MRP">₹{product.MRP}</p>
            </div>
            <p
              style={{
                color: product.stock === "Sold Out" ? "#d35656" : "green",
                fontWeight: "700",
              }}
            >
              {product.stock}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  handleAddToCart(product);
                }}
                style={{
                  padding: "0.5rem 3.8rem",
                  border: "1px solid black",
                  backgroundColor: "transparent",
                  color: "black",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
