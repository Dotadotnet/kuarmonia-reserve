import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const kuarmoniaApi = createApi({
  reducerPath: "kuarmoniaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API}`,
  }),
  tagTypes: ["User", "Cart", "Rent","Session", "Favorite", "Purchase", "Review","Category","Tag","CategoryDropdown","TagDropdown","Blog","Post","Gallery","Slide","Media","Verify","Property","Type","TradeType","SaleType","Faqs" , "Admin"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});