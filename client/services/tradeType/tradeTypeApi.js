import { kuarmoniaApi } from "../kuarmonia";

const tradeTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    GetTradeTypes: builder.query({
      query: () => ({
        url: `/tradeType/get-tradeTypes`,
        method: "GET"
      }),
      providesTags: ["TradeType"]
    })
  })
});

export const { useGetTradeTypesQuery } = tradeTypeApi;
