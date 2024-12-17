import React from 'react';
import { useLocation } from 'react-router-dom';
import carburetorData from '../../data/carburetor.json'; // Import the data files
import carburetorRepairKitData from '../../data/carburetorRepairKit.json'; // Import the data files
import connectingRoadKitData from '../../data/connectingRoadKit.json'; // Import the data files

const ProductListCard = () => {
  const location = useLocation();
  const { productIndex, category } = location.state || {};
  
  // Get products based on category
  const products = getProductsByCategory(category); 
  const product = products[productIndex];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-card-container">
      <h1>{product.name}</h1>
      <img src={product.img} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>MRP: {product.MRP}</p>
      <p>Stock: {product.stock}</p>
      {/* Add any additional details and components */}
    </div>
  );
};

const getProductsByCategory = (category) => {
  switch (category) {
    case "Carburetor":
      return carburetorData[category].products;
    case "Carburetor Repair Kit":
      return carburetorRepairKitData[category].products;
    case "Connecting Road Kit":
      return connectingRoadKitData[category].products;
    default:
      return [];
  }
};

export default ProductListCard;
