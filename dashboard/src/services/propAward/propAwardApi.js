import { kuarmoniaApi } from "../kuarmonia";

const propAwardApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addPropAward: builder.mutation({
      query: (body) => ({
        url: "/propAward/add-propAward",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "PropAward",
      ],
    }),

    getPropAwards: builder.query({
      query: () => ({
        url: `/propAward/get-propAwards/`,
        method: "GET",
      }),
      providesTags: ["PropAward"],
    }),

    removePropAward: builder.mutation({
      query: (id) => ({
        url: `/propAward/delete-propAward/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["PropAward", "Admin"],
    }),

    updatePropAward: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/propAward/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["PropAward"],
    }),
  }),
});

export const {
  useAddPropAwardMutation,
  useGetPropAwardsQuery,
  useUpdatePropAwardMutation,
  useRemovePropAwardMutation
} = propAwardApi;
