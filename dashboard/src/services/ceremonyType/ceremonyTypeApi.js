import { kuarmoniaApi } from "../kuarmonia";

const ceremonyTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addCeremonyType: builder.mutation({
      query: (body) => ({
        url: "/ceremonyType/add-ceremonyType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Admin", "CeremonyType"]
    }),

    getCeremonyTypes: builder.query({
      query: () => ({
        url: `/ceremonyType/get-ceremonyTypes`,
        method: "GET"
      }),
      providesTags: ["CeremonyType"]
    }),

    getCeremonyType: builder.query ({
      query: (id) => ({
        url: `/ceremonyType/get-ceremonyType/${id}`,
        method: "GET"
      }),

      providesTags: ["CeremonyType"]
    }),

    removeCeremonyType: builder.mutation({
      query: (id) => ({
        url: `/ceremonyType/delete-ceremonyType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["CeremonyType", "Admin"]
    }),

    updateCeremonyType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/ceremonyType/update-ceremonyType/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),
      invalidatesTags: ["CeremonyType","Admin"]
    })
  })
});

export const {
  useAddCeremonyTypeMutation,
  useGetCeremonyTypesQuery,
  useGetCeremonyTypeQuery,
  useUpdateCeremonyTypeMutation,
  useRemoveCeremonyTypeMutation
} = ceremonyTypeApi;
