import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-container">
      <img src="https://eauto.co.in/cdn/shop/files/eautobanners_Desktop_Bike_Model_f651b811-b1c3-490f-bcfb-cdcf3f8f88c4_1800x.jpg?v=1630859021" />
      <div
        style={{
          color: "white",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h3
          style={{
            marginBottom: "-1.2rem",
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          EXPLORE OUR COLLECTION BY
        </h3>
        <h1>Bike Model</h1>
        <button className="hero-button">Shop Now</button>
      </div>
    </div>
  );
}

export default Hero;
