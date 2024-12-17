import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductList.css'; // Ensure this path is correct for styles
import Banner from '../Banner/Banner'; // Ensure you have this component
import Navbar1 from '../Nav1/Navbar';
import Navbar2 from '../Nav2/Navbar';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import carburetorData from '../../data/carburetor.json'; // Import your JSON file
import carburetorRepairKitData from '../../data/carburetorRepairKit.json'; // Import your JSON file
import connectingRoadKitData from '../../data/connectingRoadKit.json'; // Import your JSON file

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const [showSparesBrand, setShowSparesBrand] = useState(false);
  const [showVehicleBrand, setShowVehicleBrand] = useState(false);
  const [showVehicleModel, setShowVehicleModel] = useState(false);
  
  const [title, setTitle] = useState(''); // Define title in state
  const [category, setCategory] = useState(''); // Define category in state

  const toggleDropdown = (setter) => {
    setter(prevState => !prevState);
  };

  useEffect(() => {
    if (product) {
      const productListName = product.name;
      let productData;

      // Determine the JSON data based on the product name
      switch (productListName) {
        case "Carburetor":
          productData = carburetorData[productListName]; // Use imported data
          break;
        case "Carburetor Repair Kit":
          productData = carburetorRepairKitData[productListName]; // Use imported data
          break;
          case "Connecting Road Kit":
            productData = connectingRoadKitData[productListName]; // Use imported data
            break;
        default:
          console.error("No data found for:", productListName);
          setLoading(false);
          return;
      }

      if (productData) {
        setProducts(productData.products || []); // Save the product data
        setTitle(productData.title || ''); // Set the title
        setCategory(productListName); // Set the category

        if (products.length === 0) {
          console.error("No product data found for:", productListName);
        }
      }
      setLoading(false);
    }
  }, [product]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <Banner />
      <Navbar1 />
      <Navbar2 />
      <div style={{ marginTop: "15px" }}>
        <p style={{ textAlign: "left", paddingLeft: "50px" }}>
          <a href="/" style={{ textDecoration: "none", color: "black" }}>Home</a> &gt; {product.name}
        </p>
      </div>
      <div className="product-list-page-container" style={{ marginBottom: "9rem" }}>
        <div className="filter-section">
          <h3>Filters</h3>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowCategory)}>
              Category <FontAwesomeIcon icon={showCategory ? faChevronUp : faChevronDown} />
            </h4>
            {showCategory && (
              <label>
                <input type="checkbox" />
                Category Option
              </label>
            )}
          </div>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowSparesBrand)}>
              Spares Brand <FontAwesomeIcon icon={showSparesBrand ? faChevronUp : faChevronDown} />
            </h4>
            {showSparesBrand && (
              <>
                <label>
                  <input type="checkbox" />
                  Brand Brand 1
                </label>
                <label>
                  <input type="checkbox" />
                  Brand 2
                </label>
                <label>
                  <input type="checkbox" />
                  Brand 3
                </label>
              </>
            )}
          </div>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowVehicleBrand)}>
              Vehicle Brand <FontAwesomeIcon icon={showVehicleBrand ? faChevronUp : faChevronDown} />
            </h4>
            {showVehicleBrand && (
              <>
                <label>
                  <input type="checkbox" />
                  Brand A
                </label>
                <label>
                  <input type="checkbox" />
                  Brand B
                </label>
                <label>
                  <input type="checkbox" />
                  Brand C
                </label>
              </>
            )}
          </div>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowVehicleModel)}>
              Vehicle Model <FontAwesomeIcon icon={showVehicleModel ? faChevronUp : faChevronDown} />
            </h4>
            {showVehicleModel && (
              <label>
                <input type="checkbox" />
                Model X
              </label>
            )}
          </div>
        </div>
        <div className="product-section">
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              src="https://th.bing.com/th/id/OIP.D3d1X8q9OWyRrUrEzWfxFgHaHz?w=171&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt={title}
              className="carburetor-image"
            />
            <h2 style={{fontSize:"3.5rem", fontStyle:"italic", fontWeight:"700"}}>{title}</h2>
          </div>

          <div className="flex-cnt">
            {products.map((product, index) => (
               <div key={index} className="product-cnt" onClick={() => {
                console.log('Navigating to /product-card with productIndex:', index, 'and category:', category);
                navigate("/product-list-card", { state: { productIndex: index, category } });
              }}>
                <div className="ImageTag">{product.save}</div>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "180px", objectFit: "contain" }}
                />
                <h1 style={{ marginTop: "0.5rem", fontSize: "1.2rem", fontWeight: "500" }}>{product.name}</h1>
                <div>
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
                {/* <p>{product.description.slice(0, 30)}</p> */}
                <div>
                  <p className="price" style={{fontSize:"1.2rem"}}>{product.price}</p>
                  <p className="MRP">{product.MRP}</p>
                </div>
                <p style={{ color: product.stock === "Sold Out" ? "#d35656" : "green", fontWeight: "700" }}>
                  {product.stock}
                </p>
                <div className="addToCart">
                  <button style={{ padding: "0.5rem 3.8rem",
                  border: "1px solid black",
                  backgroundColor: "transparent",
                  color: "black",
                  cursor: "pointer",
                  borderRadius: "5px",}}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
