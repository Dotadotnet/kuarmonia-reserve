import { kuarmoniaApi } from "../kuarmonia";

const venueApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenue: builder.mutation({
      query: (body) => ({
        url: "/venue/add-venue",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Venue",
      ],
    }),

    getVenues: builder.query({
      query: () => ({
        url: `/venue/get-venues`,
        method: "GET",
       
      }),
      providesTags: ["Venue"],
    }),

    removeVenue: builder.mutation({
      query: (id) => ({
        url: `/venue/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Venue", "Admin"],
    }),

    updateVenue: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venue/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Venue"],
    }),
  }),
});

export const {
  useAddVenueMutation,
  useGetVenuesQuery,
  useUpdateVenueMutation,
  useRemoveVenueMutation
} = venueApi;
