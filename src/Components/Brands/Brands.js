// src/Components/Brands/BrandSection.js
import React from "react";
import { Link } from "react-router-dom";
import { useGetAllBrandsQuery } from "../../features/brandSlice";
// import "./Brand.css";

function BrandSection() {
  const { data: brands, isLoading, error } = useGetAllBrandsQuery();

  if (isLoading) return <div>Loading brands...</div>;
  if (error) return <div>Error loading brands: {error.message}</div>;

  return (
    <div className="brand-section">
      <div className="brands-container">
        {brands?.length === 0
          ? "No brand"
          : brands?.map((brand, index) => (
              <div className="brand-card" key={index}>
                <Link to={`/brands/${brand?._id}`} className="brand-link">
                  <img
                    src={brand?.brandImage}
                    alt={`${brand?.brandName} Logo`}
                    className="brand-image"
                    height={500}
                    width={500}
                  />
                </Link>
                <p className="brand-name">{brand?.brandName}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BrandSection;
