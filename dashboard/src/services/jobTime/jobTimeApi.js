

import { kuarmoniaApi } from "../kuarmonia";

const jobTimeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobTime: builder.mutation({
      query: (body) => ({
        url: "/jobTime/add-jobTime",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["JobTime", "Admin"],
    }),

    // get all jobTimes
    getJobTimes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/jobTime/get-jobTimes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["JobTime"],
    }),

    // update jobTime
    updateJobTime: builder.mutation({
      query: ({ id, body }) => ({
        url: `/jobTime/update-jobTime/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["JobTime", "Admin"],
    }),

    // get a jobTime
    getJobTime: builder.query({
      query: (id) => ({
        url: `/jobTime/get-jobTime/${id}`,
        method: "GET",
      }),

      providesTags: ["JobTime"],
    }),

    // delete jobTime
    deleteJobTime: builder.mutation({
      query: (id) => ({
        url: `/jobTime/delete-jobTime/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["JobTime", "Admin"],
    }),
  }),
});

export const {
  useAddJobTimeMutation,
  useGetJobTimesQuery,
  useUpdateJobTimeMutation,
  useGetJobTimeQuery,
  useDeleteJobTimeMutation,
} = jobTimeApi;
