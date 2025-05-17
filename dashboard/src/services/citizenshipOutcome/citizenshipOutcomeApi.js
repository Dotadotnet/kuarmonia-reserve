

import { kuarmoniaApi } from "../kuarmonia";

const citizenshipOutcomeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addCitizenshipOutcome: builder.mutation({
      query: (body) => ({
        url: "/citizenshipOutcome/add-citizenshipOutcome",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["CitizenshipOutcome", "Admin"],
    }),

    // get all citizenshipOutcomes
    getCitizenshipOutcomes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/citizenshipOutcome/get-citizenshipOutcomes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["CitizenshipOutcome"],
    }),

    // update citizenshipOutcome
    updateCitizenshipOutcome: builder.mutation({
      query: ({ id, body }) => ({
        url: `/citizenshipOutcome/update-citizenshipOutcome/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["CitizenshipOutcome", "Admin"],
    }),

    // get a citizenshipOutcome
    getCitizenshipOutcome: builder.query({
      query: (id) => ({
        url: `/citizenshipOutcome/get-citizenshipOutcome/${id}`,
        method: "GET",
      }),

      providesTags: ["CitizenshipOutcome"],
    }),

    // delete citizenshipOutcome
    deleteCitizenshipOutcome: builder.mutation({
      query: (id) => ({
        url: `/citizenshipOutcome/delete-citizenshipOutcome/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["CitizenshipOutcome", "Admin"],
    }),
  }),
});

export const {
  useAddCitizenshipOutcomeMutation,
  useGetCitizenshipOutcomesQuery,
  useUpdateCitizenshipOutcomeMutation,
  useGetCitizenshipOutcomeQuery,
  useDeleteCitizenshipOutcomeMutation,
} = citizenshipOutcomeApi;
