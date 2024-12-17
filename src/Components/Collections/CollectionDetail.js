import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Banner from '../Banner/Banner';
import Navbar1 from '../Nav1/Navbar';
import Navbar2 from '../Nav2/Navbar';
import Footer from '../Footer/Footer';
import './CollectionDetail.css'; // Import your CSS file for styling

const FilterDropdown = ({ title, options, show, toggle }) => (
  <div className="filter-item">
    <h4 onClick={toggle}>
      {title} <FontAwesomeIcon icon={show ? faChevronUp : faChevronDown} />
    </h4>
    {show && options.map((option, index) => (
      <label key={index}>
        <input type="checkbox" />
        {option}
      </label>
    ))}
  </div>
);

const ProductDetails = () => {
  const { collectionId } = useParams();
  const { state } = useLocation();
  const [products, setProducts] = useState([]); // Changed to an array to hold multiple products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // States for the filter dropdowns
  const [showCategory, setShowCategory] = useState(false);
  const [showSparesBrand, setShowSparesBrand] = useState(false);
  const [showVehicleBrand, setShowVehicleBrand] = useState(false);
  const [showVehicleModel, setShowVehicleModel] = useState(false);

  // Define the URLs based on the clicked item ID
  const productUrls = {
    1: 'https://dummyjson.com/products?limit=10',
    2: 'https://dummyjson.com/carts?limit=10',
    3: 'https://dummyjson.com/products?limit=10'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = productUrls[collectionId];
        if (!url) {
          throw new Error("No URL found for this product.");
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products || []); // Set products to the fetched data
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionId]);

  const toggleDropdown = (setter) => {
    setter((prev) => !prev);
  };

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!products.length) {
    return <h2>No products found!</h2>;
  }

  return (
    <div>
      <Banner />
      <Navbar1 />
      <Navbar2 />
      <div style={{ marginTop: "15px" }}>
        <p style={{ textAlign: "left", paddingLeft: "50px" }}>
          <a href="/" style={{ textDecoration: "none", color: "black" }}>Home</a> &gt; {state.title}
        </p>
      </div>
      <div className="product-list-page-container" style={{ marginBottom: "9rem" }}>
        <div className="filter-section">
          <h3>Filters</h3>
          <FilterDropdown title="Category" options={["Category Option"]} show={showCategory} toggle={() => toggleDropdown(setShowCategory)} />
          <FilterDropdown title="Spares Brand" options={["Brand 1", "Brand 2", "Brand 3"]} show={showSparesBrand} toggle={() => toggleDropdown(setShowSparesBrand)} />
          <FilterDropdown title="Vehicle Brand" options={["Brand A", "Brand B", "Brand C"]} show={showVehicleBrand} toggle={() => toggleDropdown(setShowVehicleBrand)} />
          <FilterDropdown title="Vehicle Model" options={["Model X"]} show={showVehicleModel} toggle={() => toggleDropdown(setShowVehicleModel)} />
        </div>

        <div className="product-section">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src="https://i.ebayimg.com/images/g/beEAAOSwlzxhUcVk/s-l500.webp" />
          <h2 className="product-detail-title" style={{ fontSize: "3.5rem", fontStyle: "italic", fontWeight: "700" }}>{state.title}</h2>
          </div>
          <div className="flex-cnt">
            {products.map((product) => (
              <div key={product.id} className="product-cnt">
                <img src={product.image} alt={product.title} className="product-detail-image" />
                <h2>{product.name}</h2>
                <p className="product-detail-description">{product.description}</p>
                <p className="product-detail-price">Price: ${product.price}</p>
                <p className="product-detail-stock">Stock: {product.stock}</p>
                <p className="product-detail-rating">Rating: {product.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
