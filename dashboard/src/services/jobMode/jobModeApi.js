

import { kuarmoniaApi } from "../kuarmonia";

const jobModeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addJobMode: builder.mutation({
      query: (body) => ({
        url: "/jobMode/add-jobMode",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["JobMode", "Admin"],
    }),

    // get all jobModes
    getJobModes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/jobMode/get-jobModes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["JobMode"],
    }),

    // update jobMode
    updateJobMode: builder.mutation({
      query: ({ id, body }) => ({
        url: `/jobMode/update-jobMode/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["JobMode", "Admin"],
    }),

    // get a jobMode
    getJobMode: builder.query({
      query: (id) => ({
        url: `/jobMode/get-jobMode/${id}`,
        method: "GET",
      }),

      providesTags: ["JobMode"],
    }),

    // delete jobMode
    deleteJobMode: builder.mutation({
      query: (id) => ({
        url: `/jobMode/delete-jobMode/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["JobMode", "Admin"],
    }),
  }),
});

export const {
  useAddJobModeMutation,
  useGetJobModesQuery,
  useUpdateJobModeMutation,
  useGetJobModeQuery,
  useDeleteJobModeMutation,
} = jobModeApi;
