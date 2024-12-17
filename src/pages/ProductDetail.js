// src/Components/Products/ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // to access the categoryId from URL
import "./ProductPage.css";
import { useFilterProductsMutation } from "../features/ProductSlice";
import ProductCard from "../Components/Brands/Product/ProductCard";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

function ProductPage() {
  const { categoryId } = useParams(); // Get categoryId from the URL
  console.log({ categoryId });
  const [brandId, setBrandId] = useState(""); // You can set a brandId if you want to filter by both
  const [products, setProducts] = useState([]); // State to hold the filtered products

  // Use the filterProducts mutation hook
  const [filterProducts, { data, isLoading, error }] =
    useFilterProductsMutation({});

  // Trigger product filter when categoryId changes (and optionally brandId)
  useEffect(() => {
    if (categoryId) {
      filterProducts({ categoryId, brandId }) // Pass categoryId and brandId in the request body
        .unwrap()
        .then((response) => {
          console.log({ response });
          setProducts(response); // Set the filtered products to state
        })
        .catch((err) => {
          console.log({ err });
          console.error("Error fetching products: ", err);
        });
    }
  }, [categoryId, brandId, filterProducts]); // Re-run the effect if categoryId or brandId changes

  if (isLoading) return <div>Loading Products...</div>;
  if (error) return <div>Error loading products: </div>;
  console.log({ products });
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "200px" }}></div>
        <div className="product-page">
          <h3 className="section-title">Products in this Category</h3>
          <div
            style={{
              display: "flex",
            }}
          >
            {products.length === 0 ? (
              <div>No products available in this category.</div>
            ) : (
              products.map((product, index) => (
                <Link to={`/product/${product._id}`}>
                  <ProductCard product={product} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
