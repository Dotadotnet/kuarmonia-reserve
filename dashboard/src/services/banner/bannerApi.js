

import { kuarmoniaApi } from "../kuarmonia";

const bannerApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addBanner: builder.mutation({
      query: (banner) => ({
        url: "/banner/add-banner",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: banner,
      }),

      invalidatesTags: ["Banner", "Admin"],
    }),

    // get all banners
getBanners: builder.query({
  query: ({ page = 1, limit = 5, search = "" } = {}) => ({
    url: `/banner/get-banners/?page=${page}&limit=${limit}&search=${search}`,
    method: "GET",
  }),
  providesTags: ["Banner"],
}),

    // update banner
    updateBanner: builder.mutation({
      query: ({ id, body }) => ({
        url: `/banner/update-banner/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Banner", "Admin"],
    }),

    // get a banner
    getBanner: builder.query({
      query: (id) => ({
        url: `/banner/get-banner/${id}`,
        method: "GET",
      }),

      providesTags: ["Banner"],
    }),

    // delete banner
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/delete-banner/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Banner", "Admin"],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useGetBannersQuery ,
  useUpdateBannerMutation,
  useGetBannerQuery,
  useDeleteBannerMutation,
} = bannerApi;
