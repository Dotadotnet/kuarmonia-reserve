import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const kuarmoniaApi = createApi({
  reducerPath: "kuarmoniaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL
  }),
  tagTypes: [
    "User",
    "Admin",
    "Product",
    "Brand",
    "Category",
    "Store",
    "Cart",
    "Favorite",
    "Purchase",
    "Review",
    "Tag",
    "Currency",
    "Post",
    "Blog",
    "Gallery",
    "VenueType",
    "VenueStandard",
    "VenueSetting",
    "VenueAward",
    "VenueAmenity",
    "Venue",
    "CeremonyType",
    "VenueService",
    "SocialLink",
    "VenueVendor",
    "News",
    "Property",
    "TradeType",
    "SaleType",
    "PropType",
    "TeamMember",
    "NewsCountry",
    "NewsType",
    "Faq",
    "Service"
  ],
  endpoints: () => ({})
});
