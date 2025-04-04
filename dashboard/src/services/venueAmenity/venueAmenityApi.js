import { kuarmoniaApi } from "../kuarmonia";

const venueAmenityApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenueAmenity: builder.mutation({
      query: (body) => ({
        url: "/venueAmenity/add-venueAmenity",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "VenueAmenity",
      ],
    }),

    GetVenueAmenities: builder.query({
      query: () => ({
        url: `/venueAmenity/get-venueAmenities`,
        method: "GET",
      }),
      providesTags: ["VenueAmenity"],
    }),

    removeVenueAmenity: builder.mutation({
      query: (id) => ({
        url: `/venueAmenity/delete-venueAmenity/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["VenueAmenity", "Admin"],
    }),

    updateVenueAmenity: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venueAmenity/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["VenueAmenity"],
    }),
  }),
});

export const {
  useAddVenueAmenityMutation,
  useGetVenueAmenitiesQuery,
  useUpdateVenueAmenityMutation,
  useRemoveVenueAmenityMutation
} = venueAmenityApi;
