import { kuarmoniaApi } from "../kuarmonia";

const galleryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addGallery: builder.mutation({
      query: (body) => ({
        url: "/gallery/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Gallery",
        "Category",
      ],
    }),

    GetGalleries: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/gallery/get-galleries`,
        method: "GET",
      }),
      providesTags: ["Gallery"],
    }),

    // get gallery
    getGallery: builder.query({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "GET",
      }),

      providesTags: ["Gallery"],
    }),

    GetClientGallery: builder.query({
      query: () => ({
        url: `/gallery/get-galleries`,
        method: "GET",
        params: { type: "client" }, 
      }),
      providesTags: ["Gallery"],
    }),


    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
  
      invalidatesTags: [
        "User",
        "Gallery",
        "Category"
      ],
    }),

    updateGallery: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/gallery/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useAddGalleryMutation,
  useGetGalleryQuery,
  useGetClientGalleryQuery,
  useGetGalleriesQuery,
  useDeleteGalleryMutation,
  useUpdateGalleryMutation,
} = galleryApi;
