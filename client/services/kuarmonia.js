import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API;
console.log("BASE URL:", baseUrl);

export const kuarmoniaApi = createApi({
  reducerPath: "kuarmoniaApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["User", "Cart", "Rent","Session", "Favorite", "Purchase", "Review","Category","Tag","CategoryDropdown","TagDropdown","Blog","Post","Gallery","Slide","Media","Verify","Property","Type","TradeType","SaleType","Faqs" , "Admin"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
