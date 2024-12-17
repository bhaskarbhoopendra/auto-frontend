import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faHeadset } from "@fortawesome/free-solid-svg-icons";

function Banner() {
  return (
    <div
      className="deal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#E8DDFF",
        padding: "7px 20px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft:"125px"
        }}
      >
        <FontAwesomeIcon icon={faGift} style={{ marginRight: "10px" }} />
        <h1 style={{ fontSize: "1rem", fontWeight: "400" }}>
          Grab the deal. Get 50% off on your first order.
        </h1>
      </div>

      <div
        className="customer-support"
        style={{ display: "flex", alignItems: "center", paddingRight: "20px" }}
      >
        <FontAwesomeIcon icon={faHeadset} style={{ marginRight: "10px" }} />
        <h1 style={{ fontSize: "1rem", fontWeight: "400" }}>Customer Care</h1>
      </div>
    </div>
  );
}

export default Banner;
