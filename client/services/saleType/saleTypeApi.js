import { kuarmoniaApi } from "../kuarmonia";

const saleTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    

    GetSaleTypes: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/saleType/get-saleTypes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["SaleType"],
    }),

    
  }),
});

export const {
  useAddSaleTypeMutation,
  useGetSaleTypesQuery,
  useUpdateSaleTypeMutation,
    useRemoveSaleTypeMutation
  
} = saleTypeApi;
