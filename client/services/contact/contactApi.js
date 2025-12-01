import { kuarmoniaApi } from "../kuarmonia";

const contactApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // create contact message
    createContact: builder.mutation({
      query: (formData) => ({
        url: "/contact/create",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateContactMutation,
} = contactApi;