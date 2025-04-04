import { kuarmoniaApi } from "../kuarmonia";

const venueServiceApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenueService: builder.mutation({
      query: (body) => ({
        url: "/venueService/add-venueService",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "VenueService",
      ],
    }),

    GetVenueServices: builder.query({
      query: () => ({
        url: `/venueService/get-venueServices`,
        method: "GET",
      }),
      providesTags: ["VenueService"],
    }),

    removeVenueService: builder.mutation({
      query: (id) => ({
        url: `/venueService/delete-venueService/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["VenueService", "Admin"],
    }),

    updateVenueService: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venueService//update-venueService/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["VenueService"],
    }),
  }),
});

export const {
  useAddVenueServiceMutation,
  useGetVenueServicesQuery,
  useUpdateVenueServiceMutation,
  useRemoveVenueServiceMutation
} = venueServiceApi;
