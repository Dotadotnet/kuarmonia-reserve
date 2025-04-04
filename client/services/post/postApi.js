const { kuarmoniaApi } = require("../kuarmonia");

const postApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (body) => ({
        url: "/post/",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Post",
      
      ],
    }),

    getPosts: builder.query({
      query: ({ page = 1, limit = 7, search = "", adminId }) => ({
        url: `/post/?page=${page}&limit=${limit}&search=${search}&adminId=${adminId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getPost: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllPosts: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: `/post/?page=${page}&limit=${limit}`,
        method: "GET",
        params: { type: "client" }, 
      }),
      providesTags: ["Post", "Tag", "User","Category"],
    }),


    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
  
      invalidatesTags: [
        "User",
        "Category",
        "Tag",
        "Like",
        "Comment",
        "view",
      ],
    }),
 
    updatePost: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/post/${id}`,
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
  useAddPostMutation,
  useGetPostsQuery,
  useGetAllPostsQuery,
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} = postApi;
