// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import engineReducer from './engineSlice';
import cartReducer from './cartSlice'; // Import cartReducer

const store = configureStore({
  reducer: {
    products: productReducer,
    engine: engineReducer,
    cart: cartReducer, // Add cart reducer
  },
});

export default store;
