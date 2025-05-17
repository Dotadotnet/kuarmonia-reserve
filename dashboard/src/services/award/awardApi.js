import { kuarmoniaApi } from "../kuarmonia";

const awardApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addAward: builder.mutation({
      query: (body) => ({
        url: "/award/add-award",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Award",
      ],
    }),

    getAwards: builder.query({
      query: () => ({
        url: `/award/get-awards/`,
        method: "GET",
      }),
      providesTags: ["Award"],
    }),

    removeAward: builder.mutation({
      query: (id) => ({
        url: `/award/delete-award/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Award", "Admin"],
    }),

    updateAward: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/award/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Award"],
    }),
  }),
});

export const {
  useAddAwardMutation,
  useGetAwardsQuery,
  useUpdateAwardMutation,
  useRemoveAwardMutation
} = awardApi;
