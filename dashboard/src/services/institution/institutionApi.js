import { kuarmoniaApi } from "../kuarmonia";

const institutionApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addInstitution: builder.mutation({
      query: (body) => ({
        url: "/institution/add-institution",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Institution",
      ],
    }),

    getInstitutions: builder.query({
      query: () => ({
        url: `/institution/get-institutions/`,
        method: "GET",
      }),
      providesTags: ["Institution"],
    }),

    removeInstitution: builder.mutation({
      query: (id) => ({
        url: `/institution/delete-institution/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Institution", "Admin"],
    }),

    updateInstitution: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/institution/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Institution"],
    }),
  }),
});

export const {
  useAddInstitutionMutation,
  useGetInstitutionsQuery,
  useUpdateInstitutionMutation,
  useRemoveInstitutionMutation
} = institutionApi;
