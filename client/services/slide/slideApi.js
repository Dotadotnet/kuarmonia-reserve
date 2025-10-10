import { kuarmoniaApi } from "../kuarmonia";

const slideApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({

    addSlide: builder.mutation({
      query: (body) => ({
        url: "/slide/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Rent",
        "User",
        "Cart",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),

    GetSlides: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/slide/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Slide"],
    }),

    // get slide
    getSlide: builder.query({
      query: (id) => ({
        url: `/slide/${id}`,
        method: "GET",
      }),
      providesTags: ["Slide"],
    }),
    getClientSlides: builder.query({
      query: () => ({
        url: `/slide`,
        method: "GET",
        params: { type: "client" },
      }),
      providesTags: ["Slide", "User"],
    }),


    deleteSlide: builder.mutation({
      query: (id) => ({
        url: `/slide/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: [
        "User",
        "Slide",
      ],
    }),

    updateSlide: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/slide/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Slide"],
    }),
    GetSlidesBanner: builder.query({
      query: () => ({
        url: `/dynamic/get-all/banner`,
        method: "GET",
      })
    })
  }),
});

export const {
  useAddSlideMutation,
  useGetSlideQuery,
  useGetSlidesQuery,
  useGetClientSlidesQuery,
  useDeleteSlideMutation,
  useUpdateSlideMutation,
  useGetSlidesBannerQuery
} = slideApi;
