
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const kuarmoniaApi = createApi({
  reducerPath: "kuarmoniaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: [
    "User",
    "Product",
    "Brand",
    "Category",
    "Store",
    "Cart",
    "Favorite",
    "Purchase",
    "Review",
    "Tag",
    "Unit",
    "Post",
    "Blog",
    "Gallery"
  ],
  endpoints: () => ({}),
});
