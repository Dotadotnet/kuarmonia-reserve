

import { kuarmoniaApi } from "../kuarmonia";

const faqApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addFaq: builder.mutation({
      query: (faq) => ({
        url: "/faqs/add-faq",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: faq,
      }),

      invalidatesTags: ["Faq", "Admin"],
    }),

    // get all faqs
    getFaqs: builder.query({
      query: () => ({
        url: "/faqs/get-faqs",
        method: "GET",
      }),

      providesTags: ["Faq"],
    }),

    // update faq
    updateFaq: builder.mutation({
      query: ({ id, body }) => ({
        url: `/faqs/update-faq/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Faq", "Admin"],
    }),

    // get a faq
    getFaq: builder.query({
      query: (id) => ({
        url: `/faqs/get-faq/${id}`,
        method: "GET",
      }),

      providesTags: ["Faq"],
    }),

    // delete faq
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faqs/delete-faq/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Faq", "Admin"],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useGetFaqsQuery,
  useUpdateFaqMutation,
  useGetFaqQuery,
  useDeleteFaqMutation,
} = faqApi;
