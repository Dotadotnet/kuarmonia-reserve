import { kuarmoniaApi } from "../kuarmonia";

const venueTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenueType: builder.mutation({
      query: (body) => ({
        url: "/venueType/add-venueType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "VenueType",
      ],
    }),

    GetVenueTypes: builder.query({
      query: () => ({
        url: `/venueType/get-venueTypes`,
        method: "GET",
       
      }),
      providesTags: ["VenueType"],
    }),

    removeVenueType: builder.mutation({
      query: (id) => ({
        url: `/venueType/delete-venueType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["VenueType", "Admin"],
    }),

    updateVenueType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venueType/update-venueType/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["VenueType"],
    }),
  }),
});

export const {
  useAddVenueTypeMutation,
  useGetVenueTypesQuery,
  useUpdateVenueTypeMutation,
  useRemoveVenueTypeMutation
} = venueTypeApi;
