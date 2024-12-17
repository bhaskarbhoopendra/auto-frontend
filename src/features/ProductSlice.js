import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice for products
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api", // Replace with your actual API base URL
  }),
  tagTypes: ["Product"], // Use tags for cache invalidation
  endpoints: (builder) => ({
    // Fetch all products
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    // Fetch a single product by ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response) => response, // Assuming the response structure is wrapped in 'data'
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"], // Invalidate the cache to refetch product list
    }),

    // Edit a product by ID
    editProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: productData,
      }),
      //   invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // Filter products by categoryId and/or brandId
    filterProducts: builder.mutation({
      query: ({ categoryId, brandId }) => ({
        url: "/products/filter",
        method: "POST",
        body: { categoryId, brandId }, // Send categoryId and/or brandId
      }),
      // No need to invalidate cache as this is a read operation
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useFilterProductsMutation, // Make sure this is imported correctly
} = productApi;
