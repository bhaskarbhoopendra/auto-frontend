import React from "react";
import Banner from "../Banner/Banner";
import Navbar1 from "../Nav1/Navbar";
import Navbar2 from "../Nav2/Navbar";
import Hero from "../Hero/Hero";
import Review from "../CustomerReview/Review";
import Footer from "../Footer/Footer";
import EngineComponent from "../Products/Engine";
import Product1Component from "../Products/Product";
import SideBanner from "../SideBanner/SideBanner";
import BrandPage from "../Brands/BrandPage"; // Import the BrandPage

const Dashboard = () => {
  return (
    <>
      <Banner />
      <Navbar1 />
      <Navbar2 />
      <Hero />
      {/* <EngineComponent dataKey="engineData1" /> */}
      {/* <EngineComponent dataKey="engineData2" /> */}
      {/* <Product1Component dataKey="productsData1" />
      <Product1Component dataKey="productsData2" />
      <Product1Component dataKey="productsData3" /> */}

      {/* Add the BrandPage section */}
      <BrandPage />

      <Review />
      <Footer />
      <SideBanner />
    </>
  );
};

export default Dashboard;
