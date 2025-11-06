import { kuarmoniaApi } from "../kuarmonia";

const requestApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // create request
    createRequest: builder.mutation({
      query: (formData) => ({
        url: "/request/create",
        method: "POST",
        body: formData,
        formData: true, // This tells RTK Query to handle FormData properly
      }),
    }),
    
    // get all requests
    getRequests: builder.query({
      query: () => ({
        url: "/request/all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Request"],
    }),

    // get request
    getRequest: builder.query({
      query: (id) => ({
        url: `/request/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Request"],
    }),

    // update request
    updateRequest: builder.mutation({
      query: ({ id, body }) => ({
        url: `/request/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: ["Request"],
    }),

    // delete request
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/request/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Request"],
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useGetRequestsQuery,
  useGetRequestQuery,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = requestApi;