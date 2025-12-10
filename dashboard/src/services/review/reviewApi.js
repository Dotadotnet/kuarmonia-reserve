import { kuarmoniaApi } from "../kuarmonia";

const reviewApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Review
    addReview: builder.mutation({
      query: (body) => ({
        url: "/review/add-review",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        credentials: "include",
        body
      }),
      invalidatesTags: ["Review"]
    }),

    // Get all reviews
    getAllReviews: builder.query({
      query: () => ({
        url: "/review/get-reviews",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),
      providesTags: ["Review"]
    }),

    // Get reviews by target type and ID
    getReviewsByTarget: builder.query({
      query: ({ type, id }) => ({
        url: `/review/get-reviews/${type}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),
      providesTags: ["Review"]
    }),

    // Update review
    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/review/update-review/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Review"]
    }),

    // Delete review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/delete-review/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),
      invalidatesTags: ["Review"]
    })
  })
});

export const {
  useAddReviewMutation,
  useGetAllReviewsQuery,
  useGetReviewsByTargetQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} = reviewApi;