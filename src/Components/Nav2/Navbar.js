import React, { useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { useGetAllBrandsQuery } from "../../features/brandSlice";

const Navbar = () => {
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const navigate = useNavigate();

  // Fetch the brand data using RTK Query
  const { data: brandData, isLoading, error } = useGetAllBrandsQuery();
  console.log({ brandData });
  // Function to handle login button click
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Render loading or error state if applicable
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand data</div>;

  return (
    <nav className="navbar2">
      <ul className="nav-links2">
        {brandData &&
          brandData.map((brand) => (
            <li
              key={brand._id}
              className="dropdown2"
              onMouseEnter={() => setHoveredBrand(brand.brandName)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <a href="#">{brand.brandName}</a>
              {hoveredBrand === brand.brandName && (
                <div className="dropdown-content2">
                  {/* Bike Column */}
                  <div className="column2 bike-column">
                    <h4>Bike</h4>
                    <ul>
                      {brand.bikes?.map((bike) => (
                        <li key={bike.name}>
                          <a href={bike.link}>{bike.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Conditionally Render Scooter Column */}
                  {brand.scooters && brand.scooters.length > 0 && (
                    <div className="column2 scooter-column">
                      <h4>Scooter</h4>
                      <ul>
                        {brand.scooters.map((scooter) => (
                          <li key={scooter.name}>
                            <a href={scooter.link}>{scooter.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
