// src/hooks/useBrands.js
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all brands
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/brands/get');
      setBrands(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new brand
  const createBrand = async (newBrand) => {
    try {
      const response = await axiosInstance.post('/brands/create', newBrand);
      setBrands([...brands, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  // Update an existing brand by id
  const updateBrand = async (id, updatedBrand) => {
    try {
      const response = await axiosInstance.put(`/brands/update/${id}`, updatedBrand);
      setBrands(brands.map(brand => brand.id === id ? response.data : brand));
    } catch (err) {
      setError(err);
    }
  };

  // Delete a brand by id
  const deleteBrand = async (id) => {
    try {
      await axiosInstance.delete(`/brands/delete/${id}`);
      setBrands(brands.filter(brand => brand.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchBrands(); // Fetch brands when the hook is mounted
  }, []);

  return {
    brands,
    loading,
    error,
    fetchBrands,
    createBrand,
    updateBrand,
    deleteBrand
  };
};

export default useBrands;
