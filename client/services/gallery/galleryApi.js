import { kuarmoniaApi } from "../kuarmonia";

const galleryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    getFirstGallery: builder.query({
      query: () => ({
        url: `/gallery/get-first-gallery`,
        method: "GET"
      }),

      providesTags: ["Gallery"]
    }),

    // get gallery
    getGallery: builder.query({
      query: (id) => ({
        url: `/gallery/get-gallery/${id}`,
        method: "GET"
      }),

      providesTags: ["Gallery"]
    })
  })
});

export const {
  useAddGalleryMutation,
  useGetFirstGalleryQuery,
  useGetGalleryQuery,
  useGetClientGalleryQuery,
  useGetGalleriesQuery,
  useDeleteGalleryMutation,
  useUpdateGalleryMutation
} = galleryApi;
