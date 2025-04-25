import { kuarmoniaApi } from "../kuarmonia";

const propStandardApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addPropStandard: builder.mutation({
      query: (body) => ({
        url: "/propStandard/add-propStandard",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "PropStandard",
      ],
    }),

    GetPropStandards: builder.query({
      query: () => ({
        url: `/propStandard/get-propStandards/`,
        method: "GET",
      }),
      providesTags: ["PropStandard"],
    }),

    removePropStandard: builder.mutation({
      query: (id) => ({
        url: `/propStandard/delete-propStandard/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["PropStandard", "Admin"],
    }),

    updatePropStandard: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/propStandard/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["PropStandard"],
    }),
  }),
});

export const {
  useAddPropStandardMutation,
  useGetPropStandardsQuery,
  useUpdatePropStandardMutation,
  useRemovePropStandardMutation
} = propStandardApi;
