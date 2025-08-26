import { kuarmoniaApi } from "../kuarmonia";

const blogApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new blog
    addBlog: builder.mutation({
      query: (body) => ({
        url: "/blog/add-blog",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Blog", "User"],
    }),

    // get all blogs
    getBlogs: builder.query({
      query: () => ({
        url: "/dynamic/get-all/blog",
        method: "GET",
      }),

      providesTags: ["Blog"],
    }),

    // update blog
    updateBlog: builder.mutation({
      query: ({ id, body }) => ({
        url: `/blog/update-blog/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Blog", "User"],
    }),

    // get a blog
    getBlog: builder.query({
      query: (id) => ({
        url: `/blog/get-blog/${id}`,
        method: "GET",
      }),

      providesTags: ["Blog"],
    }),

    // delete a blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/delete-blog/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Blog", "User"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
  useGetBlogQuery,
  useDeleteBlogMutation,
} = blogApi;
