import { kuarmoniaApi } from "../kuarmonia";

const venueVendorApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenueVendor: builder.mutation({
      query: (body) => ({
        url: "/venueVendor/add-venueVendor",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "VenueVendor",
      ],
    }),

    getVenueVendors: builder.query({
      query: () => ({
        url: `/venueVendor/get-venueVendors/`,
        method: "GET",
      }),
      providesTags: ["VenueVendor"],
    }),

    removeVenueVendor: builder.mutation({
      query: (id) => ({
        url: `/venueVendor/delete-venueVendor/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["VenueVendor", "Admin"],
    }),

    updateVenueVendor: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venueVendor/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["VenueVendor"],
    }),
  }),
});

export const {
  useAddVenueVendorMutation,
  useGetVenueVendorsQuery,
  useUpdateVenueVendorMutation,
  useRemoveVenueVendorMutation
} = venueVendorApi;
