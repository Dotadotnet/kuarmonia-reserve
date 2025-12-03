import { kuarmoniaApi } from "../kuarmonia";

const TagApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new tag
    addTag: builder.mutation({
      query: (body) => ({
        url: "/tag/add-tag",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Tag", "User"],
    }),

    // get all tags
    getTags: builder.query({
      query: ({ page = 1, limit = 1000, search = "" } = {}) => ({
        url: `/tag/get-tags/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        
      }),

      providesTags: ["Tag"],
    }),

    // update tag
    updateTag: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tag/update-tag/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Tag", "User"],
    }),

    // get a tag
    getTag: builder.query({
      query: (id) => ({
        url: `/tag/get-tag/${id}`,
        method: "GET",
      }),

      providesTags: ["Tag"],
    }),

    // delete a tag
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tag/delete-tag/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Tag", "User"],
    }),
  }),
});

export const {
  useAddTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
  useGetTagQuery,
  useDeleteTagMutation,
} = TagApi;
