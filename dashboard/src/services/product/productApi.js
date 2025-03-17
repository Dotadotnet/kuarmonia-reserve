import { kuarmoniaApi } from "../kuarmonia";

const productApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new product
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/product/add-product",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),

      invalidatesTags: ["Product", "Category", "User"]
    }),

    // get all products
    getProducts: builder.query({
      query: () => ({
        url: "/product/get-products",
        method: "GET"
      }),

      providesTags: ["Product"]
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),

      invalidatesTags: ["Product", "Category", "User"]
    }),
    //update prodduct Approve
    updateProductApprove: builder.mutation({
      query: ({ id }) => ({
        url: `/product/update-product-approve/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: {}
      }),
      invalidatesTags: ["Product", "Category", "User"]
    }),
    // بازبینی محصول
    updateProductReview: builder.mutation({
      query: ({ id }) => ({
        url: `/product/update-product-review/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: {}
      }),
      invalidatesTags: ["Product", "Category", , "User"]
    }),

    updateProductReject: builder.mutation({
      query: ({ id, message }) => ({
        url: `/product/update-product-reject/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: {
          rejectedMessage: message // پیام رد
        }
      }),
      invalidatesTags: ["Product", "Category", "User"]
    }),

    updateProductStatus: builder.mutation({
      query: ({ id, message }) => ({
        url: `/product/update-product-status/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: {}
      }),
      invalidatesTags: ["Product", "Category", "User"]
    }),

    // get a single product
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/get-product/${id}`,
        method: "GET"
      }),

      providesTags: ["Product"]
    }),

    // filtered products
    getFilteredProducts: builder.mutation({
      query: (query) => ({
        url: `/product/filtered-products?${query}`,
        method: "GET"
      }),

      providesTags: ["Product"]
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["Product", "Category", "User"]
    })
  })
});

export const {
  useUpdateProductApproveMutation,
  useUpdateProductRejectMutation,
  useUpdateProductReviewMutation,
  useUpdateProductStatusMutation,
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductQuery,
  useGetFilteredProductsMutation,
  useDeleteProductMutation
} = productApi;
