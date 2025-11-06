import { kuarmoniaApi } from "../kuarmonia";

const IconApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new icon
    addIcon: builder.mutation({
      query: (body) => ({
        url: "/icon/add-icon",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Icon", "User"],
    }),

    // get all icons
    getIcons: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/icon/get-icons/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["Icon"],
    }),

    // update icon
    updateIcon: builder.mutation({
      query: ({ id, body }) => ({
        url: `/icon/update-icon/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Icon", "User"],
    }),

    // get a icon
    getIcon: builder.query({
      query: (id) => ({
        url: `/icon/get-icon/${id}`,
        method: "GET",
      }),

      providesTags: ["Icon"],
    }),

    // delete a icon
    deleteIcon: builder.mutation({
      query: (id) => ({
        url: `/icon/delete-icon/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Icon", "User"],
    }),
  }),
});

export const {
  useAddIconMutation,
  useGetIconsQuery,
  useUpdateIconMutation,
  useGetIconQuery,
  useDeleteIconMutation,
} = IconApi;
