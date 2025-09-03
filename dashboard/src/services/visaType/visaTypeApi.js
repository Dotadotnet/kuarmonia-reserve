import { kuarmoniaApi } from "../kuarmonia";

const visaTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addVisaType: builder.mutation({
      query: (body) => ({
        url: "/visaType/add-visaType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Admin", "VisaType"]
    }),

    GetVisaTypes: builder.query({
      query: () => ({
        url: `/visaType/get-visaTypes`,
        method: "GET"
      }),
      providesTags: ["VisaType"]
    }),

    // get a visaType
    getVisaType: builder.query({
      query: (id) => ({
        url: `/visaType/get-visaType/${id}`,
        method: "GET"
      }),

      providesTags: ["VisaType"]
    }),

    removeVisaType: builder.mutation({
      query: (id) => ({
        url: `/visaType/delete-visaType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["VisaType", "Admin"]
    }),

    updateVisaType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/visaType/update-visaType/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),
      invalidatesTags: ["VisaType"]
    })
  })
});

export const {
  useAddVisaTypeMutation,
  useGetVisaTypesQuery,
  useGetVisaTypeQuery,
  useUpdateVisaTypeMutation,
  useRemoveVisaTypeMutation
} = visaTypeApi;
