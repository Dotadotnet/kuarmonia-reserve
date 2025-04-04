import { kuarmoniaApi } from "../kuarmonia";

const venueSettingApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVenueSetting: builder.mutation({
      query: (body) => ({
        url: "/venueSetting/add-venueSetting",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "VenueSetting",
      ],
    }),

    GetVenueSettings: builder.query({
      query: () => ({
        url: `/venueSetting/get-venueSettings`,
        method: "GET",
      }),
      providesTags: ["VenueSetting"],
    }),

    removeVenueSetting: builder.mutation({
      query: (id) => ({
        url: `/venueSetting/delete-venueSetting/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["VenueSetting", "Admin"],
    }),

    updateVenueSetting: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/venueSetting/update-venueSetting/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["VenueSetting"],
    }),
  }),
});

export const {
  useAddVenueSettingMutation,
  useGetVenueSettingsQuery,
  useUpdateVenueSettingMutation,
  useRemoveVenueSettingMutation
} = venueSettingApi;
