const { kuarmoniaApi } = require("../kuarmonia");

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

      invalidatesTags: ["Review", "Rent", "User", "Session"]
    }),

    getReviews: builder.query({
      query: ({ type, id }) => ({
        url: `/review/get-reviews/${type}/${id}`,
        method: "GET"
      }),
      providesTags: ["Review", "Rent"]
    }),
    // remove review
    removeReview: builder.mutation({
      query: (id) => ({
        url: `/review/delete-review/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["Review", "Rent", "User", "Session"]
    })
  })
});

export const {
  useAddReviewMutation,
  useRemoveReviewMutation,
  useGetReviewsQuery
} = reviewApi;
