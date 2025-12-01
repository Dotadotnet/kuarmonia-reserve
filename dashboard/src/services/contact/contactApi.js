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
    
    // get all contacts
    getContacts: builder.query({
      query: () => ({
        url: "/contact/all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Contact"],
    }),

    // get contact
    getContact: builder.query({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Contact"],
    }),

    // update contact
    updateContact: builder.mutation({
      query: ({ id, body }) => ({
        url: `/contact/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: ["Contact"],
    }),

    // delete contact
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;