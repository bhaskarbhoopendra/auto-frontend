// src/App.js
import React from "react";
import { Provider } from "react-redux";
// import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing Components
import Navbar from "./Components/Nav1/Navbar"; // Corrected import path
import Navbar2 from "./Components/Nav2/Navbar"; // Corrected import path
import CartSidebar from "./Components/Cart/CartSidebar"; // Corrected import path
import Checkout from "./Components/Checkout/Checkout"; // Corrected import path
import Banner from "./Components/Banner/Banner";
import Hero from "./Components/Hero/Hero";
import BrandSection from "./Components/Brands/Brands";
import BrandPage from "./Components/Brands/BrandPage";
import Review from "./Components/CustomerReview/Review";
import Footer from "./Components/Footer/Footer";
import EngineComponent from "./Components/Products/Engine";
import Product1Component from "./Components/Products/Product";
import Collection from "./Components/Collections/Collection";
import ProductDetails from "./Components/Collections/CollectionDetail";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import RecoverPassword from "./Components/RecoverPassword1/Recover";
import CarburetorPage from "./Components/Carburetor/Carburetor";
import ProductCardPage from "./Components/Products/ProductCardPage";
import ProductList from "./Components/Products/ProductList";
import SideBanner from "./Components/SideBanner/SideBanner";
import WholesaleSignUpForm from "./Components/Nav1Links/Wholesale";
import ReturnAndExchanges from "./Components/Nav1Links/ReturnExchange";
import OrderTracking from "./Components/Nav1Links/OrderTracking";
import FAQs from "./Components/Nav1Links/FAQs";
import ProductListCard from "./Components/Products/ProductListCard";
import NotFound from "./Components/NotFound";
import Dashboard from "./Components/Dashboard/Dashboard";
import store from "./store";
import CategorySection from "./Components/Catergories/Categories";
import ProductPage from "./pages/ProductDetail";
import ProductSummary from "./pages/ProductSummary";
import "./App.css";
import CategoryWithBrand from "./pages/CategoryWithBrand/CategoryWithBrand";

// HomePage Component
const HomePage = () => (
  <>
    <Banner />
    <Navbar />
    <Navbar2 />
    <Hero />
    <BrandSection />
    <CategorySection />
    {/* <EngineComponent dataKey="engineData1" /> */}
    {/* <EngineComponent dataKey="engineData2" /> */}
    {/* <Product1Component dataKey="productsData1" /> */}
    {/* <Product1Component dataKey="productsData2" /> */}
    {/* <Product1Component dataKey="productsData3" /> */}
    <Review />
    <Footer />
    <SideBanner />
  </>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <CartSidebar /> {/* CartSidebar is included globally */}
          <Routes>
            {/* Main Page */}
            <Route path="/" element={<HomePage />} />
            {/* Login Page */}
            <Route path="/login" element={<Login />} />
            {/* Dashboard Page */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Register Page */}
            <Route path="/register" element={<Register />} />
            {/* Recover Password Page */}
            <Route path="/recover" element={<RecoverPassword />} />
            {/* Add new brand route */}
            {/* Dynamic All Collections Page */}
            <Route path="/collections/:dataKey" element={<Collection />} />
            {/* Product Details Page */}
            <Route
              path="/products/:collectionId"
              element={<ProductDetails />}
            />
            <Route path="/categories/:categoryId" element={<ProductPage />} />
            {/* Carburetor Page */}
            <Route path="/carburetor" element={<CarburetorPage />} />
            {/* Product Card Page */}
            <Route path="/product-card" element={<ProductCardPage />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-list-card" element={<ProductListCard />} />
            {/* Wholesale Sign-up Page */}
            <Route path="/wholesale" element={<WholesaleSignUpForm />} />
            <Route path="/return" element={<ReturnAndExchanges />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/faqs" element={<FAQs />} />
            {/* Checkout Page */}
            <Route path="/checkout" element={<Checkout />} />{" "}
            {/* Ensure this component exists */}
            <Route path="/product/:productId" element={<ProductSummary />} />
            <Route path="/brands/:brandId" element={<CategoryWithBrand />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
