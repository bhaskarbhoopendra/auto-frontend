import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice for cart management
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api", // Replace with your actual API base URL
  }),
  tagTypes: ["Cart"], // For invalidating cache when cart is updated
  endpoints: (builder) => ({
    // Get user's cart
    getCart: builder.mutation({
      query: (userId) => ({
        url: "/cart",
        method: "POST", // Use POST method to send the userId in the request body
        body: { userId },
      }),
      providesTags: ["Cart"], // Invalidate Cart cache after the operation
    }),

    // Add product to the cart
    addToCart: builder.mutation({
      query: (payload) => ({
        url: "/cart/add",
        method: "POST",
        body: payload,
      }),
      // Invalidates cache for the 'Cart' tag to refresh cart data after adding an item
      invalidatesTags: ["Cart"],
    }),

    // Update cart item (quantity)
    updateCartItem: builder.mutation({
      query: (payload) => ({
        url: "/cart/update",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove product from cart
    removeFromCart: builder.mutation({
      query: (payload) => ({
        url: `/cart/remove`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: (payload) => ({
        url: `/cart/clearCart`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCartMutation,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
