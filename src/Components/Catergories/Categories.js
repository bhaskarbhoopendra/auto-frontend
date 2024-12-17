// src/Components/Brands/BrandSection.js
import React from "react";
import { Link } from "react-router-dom";
// Assuming you have the categorySlice hooked up
import "./Categories.css";
import { useGetAllCategoriesQuery } from "../../features/category";

function CategorySection() {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  console.log({ categories });
  if (isLoading) return <div>Loading Categories...</div>;
  if (error) return <div>Error loading categories: {error.message}</div>;

  return (
    <div
      style={{
        marginTop: "-40px",
      }}
      className="brand-section"
    >
      <h3 className="section-title">Brake & Clutch</h3>
      <div className="brands-container">
        {categories.slice(0, 6).map((category, index) => (
          <div className="brand-card" key={index}>
            <Link to={`/categories/${category._id}`} className="brand-link">
              <img
                style={{ borderRadius: "50%" }}
                src={category.categoryImage}
                alt={`${category.categoryName} Image`}
                className="brand-image"
              />
            </Link>
            <p className="brand-name">{category.categoryName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
