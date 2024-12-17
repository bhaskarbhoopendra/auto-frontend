import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBrandsWithCategoriesMutation } from "../../features/brandSlice"; // Adjust path as needed
import "./CategoryWithBrand.css"; // Add styles for the grid layout
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

const CategoryWithBrand = () => {
  const { brandId } = useParams(); // Get brandId from URL params
  const [getBrandsWithCategories, { data, isLoading, error }] =
    useGetBrandsWithCategoriesMutation();
  console.log({ data });
  useEffect(() => {
    if (brandId) {
      // Fetch data when brandId is available
      getBrandsWithCategories({ brandId });
    }
  }, [brandId, getBrandsWithCategories]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching categories: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No categories found for this brand.</p>;
  }

  return (
    <Layout>
      <div className="category-grid">
        {data?.categories?.length > 0 ? (
          data.categories.map((category) => (
            <div key={category._id} className="category-card">
              <Link to={`/categories/${category._id}`} className="brand-link">
                <img
                  src={category.categoryImage}
                  alt={category.categoryName}
                  className="category-image"
                />
                <h3 className="category-name">{category.categoryName}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-data-message">No data at this time</p>
        )}
      </div>
    </Layout>
  );
};

export default CategoryWithBrand;
