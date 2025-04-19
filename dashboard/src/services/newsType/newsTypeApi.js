import { kuarmoniaApi } from "../kuarmonia";

const newsTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewsType: builder.mutation({
      query: (body) => ({
        url: "/newsType/add-newsType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Admin", "NewsType"]
    }),

    GetNewsTypes: builder.query({
      query: () => ({
        url: `/newsType/get-newsTypes`,
        method: "GET"
      }),
      providesTags: ["NewsType"]
    }),

    // get a newsType
    getNewsType: builder.query({
      query: (id) => ({
        url: `/newsType/get-newsType/${id}`,
        method: "GET"
      }),

      providesTags: ["NewsType"]
    }),

    removeNewsType: builder.mutation({
      query: (id) => ({
        url: `/newsType/delete-newsType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["NewsType", "Admin"]
    }),

    updateNewsType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/newsType/update-newsType/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),
      invalidatesTags: ["NewsType"]
    })
  })
});

export const {
  useAddNewsTypeMutation,
  useGetNewsTypesQuery,
  useGetNewsTypeQuery,
  useUpdateNewsTypeMutation,
  useRemoveNewsTypeMutation
} = newsTypeApi;
