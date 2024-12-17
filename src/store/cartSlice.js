// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isCartOpen: false, // State to manage cart sidebar visibility
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item by ID
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = []; // Clear all items in the cart
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen; // Toggle cart sidebar visibility
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart, toggleCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart?.items;
export const selectIsCartOpen = (state) => state.cart?.isCartOpen;

export default cartSlice.reducer;
