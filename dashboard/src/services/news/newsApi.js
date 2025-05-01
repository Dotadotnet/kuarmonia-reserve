import { kuarmoniaApi } from "../kuarmonia";

const newsApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addNews: builder.mutation({
      query: (body) => ({
        url: "/news/add-news",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "News",
      ],
    }),

    getNews: builder.query({
      query: () => ({
        url: `/news/get-news`,
        method: "GET",
       
      }),
      providesTags: ["News"],
    }),

    removeNews: builder.mutation({
      query: (id) => ({
        url: `/news/delete-news/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["News", "Admin"],
    }),

    updateNews: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useAddNewsMutation,
  useGetNewsQuery,
  useUpdateNewsMutation,
  useRemoveNewsMutation
} = newsApi;
