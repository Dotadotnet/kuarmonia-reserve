import { kuarmoniaApi } from "../kuarmonia";

const UploadApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new upload
    Upload: builder.mutation({
      query: (body) => ({
        url: "/upload/add-upload",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
    }),
    
    // delete upload
    DeleteUpload: builder.mutation({
      query: (body) => ({
        url: "/upload/delete-upload",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
    }),


  }),
});

export const {
  useUploadMutation,
  useDeleteUploadMutation,
} = UploadApi;