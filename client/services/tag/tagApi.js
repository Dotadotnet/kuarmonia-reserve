import { kuarmoniaApi } from "../kuarmonia";

const tagApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addTag: builder.mutation({
      query: (body) => ({
        url: "/tag/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: ["Tag"], // لیست تگ‌ها بعد از اضافه کردن تگ باید بروزرسانی شود
    }),

    GetTags: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/tag/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Tag"], // تگ‌ها هنگام بارگذاری لیست برای cache استفاده می‌شود
    }),

    getTagsForDropDownMenu: builder.query({
      query: () => ({
        url: "/tag/",
        method: "GET",
        params: { type: "dropdown" },
      }),
      providesTags: ["TagDropdown"],
    }),

    getTag: builder.query({
      query: (id) => ({
        url: `/tag/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateTag: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/tag/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      }),
      invalidatesTags: ["Tag"], // لیست تگ‌ها بعد از بروزرسانی باید دوباره بارگذاری شود
    }),

    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tag/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Tag"], // باید لیست تگ‌ها را بعد از حذف بروزرسانی کنیم
    }),
  }),
});

export const {
  useAddTagMutation,
  useGetTagsQuery,
  useGetTagQuery,
  useGetTagsForDropDownMenuQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;
