import { configureStore } from "@reduxjs/toolkit";
import { brandApi } from "./features/brandSlice";
import { categoryApi } from "./features/category";
import { productApi } from "./features/ProductSlice";
import { cartApi } from "./features/cartSlice";
import cartReducer from "./store/cartSlice";

const store = configureStore({
  reducer: {
    [brandApi.reducerPath]: brandApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(brandApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware),
});

export default store;
