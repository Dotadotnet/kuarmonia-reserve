const { kuarmoniaApi } = require("../kuarmonia");

const blogApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (body) => ({
        url: "/blog/",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Blog",

      ],
    }),

    getBlogs: builder.query({
      query: ({ page = 1, limit = 7, search = "", adminId }) => ({
        url: `/blog/?page=${page}&limit=${limit}&search=${search}&adminId=${adminId}`,
        method: "GET",

      }),
    }),

    getBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",

      }),

      providesTags: ["User"],
    }),

    getAllBlogs: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: process.env.VITE_BASE_URL + `/blog/?page=${page}&limit=${limit}`,
        method: "GET",
        params: { type: "client" },
      }),
      providesTags: ["Blog", "Tag", "User", "Category"],
    }),


    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: [
        "User",
        "Blog",
        "Tag",
        "Category",
        "Like",
        "Comment",
      ],
    }),

    updateBlog: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/blog/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),

  }),


});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} = blogApi;
