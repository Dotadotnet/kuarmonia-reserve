

import { kuarmoniaApi } from "../kuarmonia";

const institutionTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addInstitutionType: builder.mutation({
      query: (body) => ({
        url: "/institutionType/add-institutionType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["InstitutionType", "Admin"],
    }),

    // get all institutionTypes
    getInstitutionTypes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/institutionType/get-institutionTypes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["InstitutionType"],
    }),

    // update institutionType
    updateInstitutionType: builder.mutation({
      query: ({ id, body }) => ({
        url: `/institutionType/update-institutionType/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["InstitutionType", "Admin"],
    }),

    // get a institutionType
    getInstitutionType: builder.query({
      query: (id) => ({
        url: `/institutionType/get-institutionType/${id}`,
        method: "GET",
      }),

      providesTags: ["InstitutionType"],
    }),

    // delete institutionType
    deleteInstitutionType: builder.mutation({
      query: (id) => ({
        url: `/institutionType/delete-institutionType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["InstitutionType", "Admin"],
    }),
  }),
});

export const {
  useAddInstitutionTypeMutation,
  useGetInstitutionTypesQuery,
  useUpdateInstitutionTypeMutation,
  useGetInstitutionTypeQuery,
  useDeleteInstitutionTypeMutation,
} = institutionTypeApi;
