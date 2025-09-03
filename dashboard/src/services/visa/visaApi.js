import { kuarmoniaApi } from "../kuarmonia";

const visaApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVisa: builder.mutation({
      query: (body) => ({
        url: "/visa/add-visa",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Admin", "Visa"]
    }),

    GetVisas: builder.query({
      query: () => ({
        url: `/visa/get-visas`,
        method: "GET"
      }),
      providesTags: ["Visa"]
    }),

    // get a visa
    getVisa: builder.query({
      query: (id) => ({
        url: `/visa/get-visa/${id}`,
        method: "GET"
      }),

      providesTags: ["Visa"]
    }),

    removeVisa: builder.mutation({
      query: (id) => ({
        url: `/visa/delete-visa/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["Visa", "Admin"]
    }),

    updateVisa: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/visa/update-visa/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),
      invalidatesTags: ["Visa"]
    })
  })
});

export const {
  useAddVisaMutation,
  useGetVisasQuery,
  useGetVisaQuery,
  useUpdateVisaMutation,
  useRemoveVisaMutation
} = visaApi;
