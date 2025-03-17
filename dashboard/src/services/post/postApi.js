import { kuarmoniaApi } from "../kuarmonia";

const postApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new post
    addPost: builder.mutation({
      query: (body) => ({
        url: "/post/add-post",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Post", "User"],
    }),

    // get all posts
    getPosts: builder.query({
      query: () => ({
        url: "/post/get-posts",
        method: "GET",
      }),

      providesTags: ["Post"],
    }),

    // update post
    updatePost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/post/update-post/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Post", "User"],
    }),

    // get a post
    getPost: builder.query({
      query: (id) => ({
        url: `/post/get-post/${id}`,
        method: "GET",
      }),

      providesTags: ["Post"],
    }),

    // delete a post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/delete-post/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Post", "User"],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
} = postApi;
