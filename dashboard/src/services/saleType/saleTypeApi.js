import { kuarmoniaApi } from "../kuarmonia";

const saleTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addSaleType: builder.mutation({
      query: (body) => ({
        url: "/saleType/add-saleType",
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
        url: `/saleType/get-saleTypes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["SaleType"],
    }),

    removeSaleType: builder.mutation({
      query: (id) => ({
        url: `/saleType/delete-saleType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
  
      invalidatesTags: ["SaleType", "Admin"]
    }),

    updateSaleType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/saleType/update-saleType/${id}`,
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
