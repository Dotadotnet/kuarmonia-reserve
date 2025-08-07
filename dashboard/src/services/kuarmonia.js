import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const kuarmoniaApi = createApi({
  reducerPath: "kuarmoniaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("x-lang", "fa"); // ⬅️ اینو اضافه کن
      return headers;
    }
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
    "Standard",
    "Award",
    "Gallery",
    "VenueType",
    "VenueSetting",
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
    "Service",
    "JobType",
    "JobTime",
    "EmploymentType",
    "ExperienceLevel",
    "ResidencyStatus",
    "CitizenshipOutcome",
    "Institution",
    "InstitutionType",
    "Opportunity",
    "JobMode",
    "Rent",
    "Banner",
    "Story"
  ],
  endpoints: () => ({})
});
