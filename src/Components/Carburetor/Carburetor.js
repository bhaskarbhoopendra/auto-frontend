import React, { useState, useEffect } from "react"; 
import { useSelector } from "react-redux";
import { selectProductsByCategory } from "../../store/productSlice";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import "./Carburetor.css";
import Banner from '../Banner/Banner';
import Navbar1 from '../Nav1/Navbar';
import Navbar2 from '../Nav2/Navbar';
import Footer from '../Footer/Footer';

const CarburetorPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate function
  const category = location.state?.category || "productsData1"; // Get the category from state or use default
  const productsData = []
  
  const title = productsData.title || "Products";

  const [showCategory, setShowCategory] = useState(false);
  const [showSparesBrand, setShowSparesBrand] = useState(false);
  const [showVehicleBrand, setShowVehicleBrand] = useState(false);
  const [showVehicleModel, setShowVehicleModel] = useState(false);

  const toggleDropdown = (setter) => {
    setter(prev => !prev);
  };

  // Scroll to the top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array means this runs only on initial render

  return (
    <div>
      <Banner />
      <Navbar1 />
      <Navbar2 />
      <div style={{ marginTop: "15px" }}>
        <p style={{ textAlign: "left", paddingLeft: "50px" }}>
          <a href="/" style={{ textDecoration: "none", color: "black" }}>Home</a> &gt; {title}
        </p>
      </div>
      <div className="carburetor-page-container" style={{marginBottom:"9rem"}}>
        <div className="filter-section">
          <h3>Filters</h3>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowCategory)}>
              Category <i className={`fas fa-chevron-${showCategory ? "up" : "down"}`}></i>
            </h4>
            {showCategory && (
              <label>
                <input type="checkbox" />
                Carburetor
              </label>
            )}
          </div>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowSparesBrand)}>
              Spares Brand <i className={`fas fa-chevron-${showSparesBrand ? "up" : "down"}`}></i>
            </h4>
            {showSparesBrand && (
              <>
                <label>
                  <input type="checkbox" />
                  Bajaj OE
                </label>
                <label>
                  <input type="checkbox" />
                  Bajaj OE Carburetor
                </label>
                <label>
                  <input type="checkbox" />
                  EAuto
                </label>
              </>
            )}
          </div>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowVehicleBrand)}>
              Vehicle Brand <i className={`fas fa-chevron-${showVehicleBrand ? "up" : "down"}`}></i>
            </h4>
            {showVehicleBrand && (
              <>
                <label>
                  <input type="checkbox" />
                  Bajaj
                </label>
                <label>
                  <input type="checkbox" />
                  Hero
                </label>
                <label>
                  <input type="checkbox" />
                  Honda
                </label>
              </>
            )}
          </div>
          <div className="filter-item">
            <h4 onClick={() => toggleDropdown(setShowVehicleModel)}>
              Vehicle Model <i className={`fas fa-chevron-${showVehicleModel ? "up" : "down"}`}></i>
            </h4>
            {showVehicleModel && (
              <label>
                <input type="checkbox" />
                Wego
              </label>
            )}
          </div>
        </div>

        {/* Product Section */}
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
            {productsData.products.map((product, index) => (
              <div key={index} className="product-cnt" onClick={() => {
                console.log('Navigating to /product-card with productIndex:', index, 'and category:', category);
                navigate("/product-card", { state: { productIndex: index, category } });
              }}>
                <div className="ImageTag">{product.save}</div>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "180px", objectFit: "contain" }}
                />
                <h1  style={{ marginTop: "0.5rem", fontSize: "1.2rem", fontWeight: "500" }}>{product.name}</h1>
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
                <div>
                  <button style={{ padding: "0.5rem 3.8rem",
                  border: "1px solid black",
                  backgroundColor: "transparent",
                  color: "black",
                  cursor: "pointer",
                  borderRadius: "5px",}}>
                    Add to Bag
                  </button>
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

export default CarburetorPage;
