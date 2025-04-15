import { kuarmoniaApi } from "../kuarmonia";

const tradeTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addTradeType: builder.mutation({
      query: (body) => ({
        url: "/tradeType/add-tradeType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Admin", "Property", "TradeType"]
    }),

    GetTradeTypes: builder.query({
      query: () => ({
        url: `/tradeType/get-tradeTypes`,
        method: "GET"
      }),
      providesTags: ["TradeType"]
    }),



    removeTradeType: builder.mutation({
      query: (id) => ({
        url: `/tradeType/delete-tradeType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),
  
      invalidatesTags: ["TradeType", "Admin"]
    }),

    updateTradeType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/tradeType/update-tradeType${id}`,
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: ["TradeType"]
    })
  })
});

export const {
  useAddTradeTypeMutation,
  useGetTradeTypesQuery,
  useGetAllTradeTypesQuery,
  useUpdateTradeTypeMutation,
  useRemoveTradeTypeMutation
} = tradeTypeApi;
