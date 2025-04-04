const { kuarmoniaApi } = require("../kuarmonia");

const mediaApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addMedia: builder.mutation({
      query: (body) => ({
        url: "/media/",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),
      invalidatesTags: ["Media", "Tag", "Category"] // تغییر این قسمت
    }),

    getMedias: builder.query({
      query: ({ page = 1, limit = 7, search = "", adminId }) => ({
        url: `/media/?page=${page}&limit=${limit}&search=${search}&adminId=${adminId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),
      providesTags: ["Media", "Tag", "Category"]  // تگ‌ها درست تنظیم شده‌اند
    }),
    

    getMedia: builder.query({
      query: (id) => ({
        url: `/media/${id}`,
        method: "GET"
      }),
      providesTags: ["User"]
    }),

    getAllMedia: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: `/media/?page=${page}&limit=${limit}`,
        method: "GET",
        params: { type: "client" }
      }),
      providesTags: ["Media", "Tag", "Category"]  // تگ‌ها درست تنظیم شده‌اند
    }),

    deleteMedia: builder.mutation({
      query: (id) => ({
        url: `/media/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["User", "Category", "Tag", "Like", "Comment", "view"]
    }),

    updateMedia: builder.mutation({
      query: ({ id, data }) => ({
        url: `/media/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: data
      }),
      invalidatesTags: ["Media", "Tag", "Category"] // تغییر این قسمت
    })
  })
});

export const {
  useAddMediaMutation,
  useGetMediasQuery,
  useGetAllMediaQuery,
  useDeleteMediaMutation,
  useGetMediaQuery,
  useUpdateMediaMutation
} = mediaApi;
