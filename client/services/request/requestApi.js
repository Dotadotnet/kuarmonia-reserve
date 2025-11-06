import { kuarmoniaApi } from "../kuarmonia";

const requestApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // create request
    createRequest: builder.mutation({
      query: (formData) => ({
        url: "/request/create",
        method: "POST",
        body: formData,
        formData: true, // This tells RTK Query to handle FormData properly
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
} = requestApi;