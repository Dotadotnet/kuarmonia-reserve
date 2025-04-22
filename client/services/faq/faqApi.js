

const { kuarmoniaApi } = require("../kuarmonia");

const faqApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add to faq
    addFaq: builder.mutation({
      query: (body) => ({
        url: "/faq/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Faqs", "User"],
    }),

    // get faq
    getFaq: builder.query({
      query: () => ({
        url: "/faq/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Faqs"],
    }),

    getFaqs: builder.query({
      query: () => ({
        url: "/faqs/get-faqs",
        method: "GET",
       
      }),

      providesTags: ["Faqs"],
    }),

    // remove from faq
    removeFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Faqs", "User"],
    }),

    updateFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "update",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Faqs", "User"],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useGetFaqQuery,
  useGetFaqsQuery,
  useRemoveFaqMutation,
  useUpdateFaqMutation
} = faqApi;
