import { kuarmoniaApi } from "../kuarmonia";

const venueAwardApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenueAward: builder.mutation({
      query: (body) => ({
        url: "/venueAward/add-venueAward",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "VenueAward",
      ],
    }),

    getVenueAwards: builder.query({
      query: () => ({
        url: `/venueAward/get-venueAwards/`,
        method: "GET",
      }),
      providesTags: ["VenueAward"],
    }),

    removeVenueAward: builder.mutation({
      query: (id) => ({
        url: `/venueAward/delete-venueAward/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["VenueAward", "Admin"],
    }),

    updateVenueAward: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venueAward/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["VenueAward"],
    }),
  }),
});

export const {
  useAddVenueAwardMutation,
  useGetVenueAwardsQuery,
  useUpdateVenueAwardMutation,
  useRemoveVenueAwardMutation
} = venueAwardApi;
