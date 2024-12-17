// src/Components/Brands/BrandPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import useBrands from '../../hooks/useBrands'; // Correct relative path and hook name
import ProductCard from './Product/ProductCard';

const BrandPage = () => {
  const { brandName } = useParams();
  const { brands, loading, error } = useBrands();

  const brand = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!brand) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Brand Not Found</h2>
        <p>The brand you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem' }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <img 
          src={brand.logo} 
          alt={`${brand.title} Logo`} 
          style={{ width: '150px', height: 'auto', marginRight: '1.5rem' }} 
        />
        <h1>{brand.title}</h1>
      </div>

      {/* Products Section */}
      <h2 style={{ marginBottom: '1.5rem' }}>Our Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {brand.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
