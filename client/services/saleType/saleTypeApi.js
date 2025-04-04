import { kuarmoniaApi } from "../kuarmonia";

const saleTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addSaleType: builder.mutation({
      query: (body) => ({
        url: "/saleType/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Property",
        "SaleType",
      ],
    }),

    GetSaleTypes: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/saleType/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["SaleType"],
    }),

    removeSaleType: builder.mutation({
      query: (id) => ({
        url: `/saleType/${id}`,
        method: "DELETE"
      }),

      invalidatesTags: ["SaleType", "Admin"]
    }),

    updateSaleType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/saleType/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["SaleType"],
    }),
  }),
});

export const {
  useAddSaleTypeMutation,
  useGetSaleTypesQuery,
  useUpdateSaleTypeMutation,
    useRemoveSaleTypeMutation
  
} = saleTypeApi;
