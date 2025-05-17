

import { kuarmoniaApi } from "../kuarmonia";

const jobTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobType: builder.mutation({
      query: (body) => ({
        url: "/jobType/add-jobType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: body,
      }),

      invalidatesTags: ["JobType", "Admin"],
    }),

    // get all jobTypes
    getJobTypes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/jobType/get-jobTypes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["JobType"],
    }),

    // update jobType
    updateJobType: builder.mutation({
      query: ({ id, body }) => ({
        url: `/jobType/update-jobType/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["JobType", "Admin"],
    }),

    // get a jobType
    getJobType: builder.query({
      query: (id) => ({
        url: `/jobType/get-jobType/${id}`,
        method: "GET",
      }),

      providesTags: ["JobType"],
    }),

    // delete jobType
    deleteJobType: builder.mutation({
      query: (id) => ({
        url: `/jobType/delete-jobType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["JobType", "Admin"],
    }),
  }),
});

export const {
  useAddJobTypeMutation,
  useGetJobTypesQuery,
  useUpdateJobTypeMutation,
  useGetJobTypeQuery,
  useDeleteJobTypeMutation,
} = jobTypeApi;
