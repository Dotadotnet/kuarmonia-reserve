import { kuarmoniaApi } from "../kuarmonia";

const opportunityApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addOpportunity: builder.mutation({
      query: (body) => ({
        url: "/opportunity/add-opportunity",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Opportunity",
      ],
    }),

    getOpportunitys: builder.query({
      query: () => ({
        url: `/opportunity/get-opportunitys`,
        method: "GET",
       
      }),
      providesTags: ["Opportunity"],
    }),

    removeOpportunity: builder.mutation({
      query: (id) => ({
        url: `/opportunity/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Opportunity", "Admin"],
    }),

    updateOpportunity: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/opportunity/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Opportunity"],
    }),
  }),
});

export const {
  useAddOpportunityMutation,
  useGetOpportunitysQuery,
  useUpdateOpportunityMutation,
  useRemoveOpportunityMutation
} = opportunityApi;
