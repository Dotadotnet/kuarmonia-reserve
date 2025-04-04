import { kuarmoniaApi } from "../kuarmonia";

const venueStandardApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenueStandard: builder.mutation({
      query: (body) => ({
        url: "/venueStandard/add-venueStandard",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "VenueStandard",
      ],
    }),

    GetVenueStandards: builder.query({
      query: () => ({
        url: `/venueStandard/get-venueStandards/`,
        method: "GET",
      }),
      providesTags: ["VenueStandard"],
    }),

    removeVenueStandard: builder.mutation({
      query: (id) => ({
        url: `/venueStandard/delete-venueStandard/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["VenueStandard", "Admin"],
    }),

    updateVenueStandard: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venueStandard/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["VenueStandard"],
    }),
  }),
});

export const {
  useAddVenueStandardMutation,
  useGetVenueStandardsQuery,
  useUpdateVenueStandardMutation,
  useRemoveVenueStandardMutation
} = venueStandardApi;
