import { kuarmoniaApi } from "../kuarmonia";

const GalleryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new gallery
    addGallery: builder.mutation({
      query: (body) => ({
        url: "/gallery/add-gallery",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Gallery", "User"],
    }),

    // get all gallerys
    getGalleries: builder.query({
      query: () => ({
        url: "/gallery/get-galleries",
        method: "GET",
      }),

      providesTags: ["Gallery"],
    }),

    // update gallery
    updateGallery: builder.mutation({
      query: ({ id, body }) => ({
        url: `/gallery/update-gallery/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Gallery", "User"],
    }),

    // get a gallery
    getGallery: builder.query({
      query: (id) => ({
        url: `/gallery/get-gallery/${id}`,
        method: "GET",
      }),

      providesTags: ["Gallery"],
    }),

    // delete a gallery
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete-gallery/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Gallery", "User"],
    }),
  }),
});

export const {
  useAddGalleryMutation,
  useGetGalleriesQuery,
  useUpdateGalleryMutation,
  useGetGalleryQuery,
  useDeleteGalleryMutation,
} = GalleryApi;
