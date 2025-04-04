import { kuarmoniaApi } from "../kuarmonia";

const tradeTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addTradeType: builder.mutation({
      query: (body) => ({
        url: "/tradeType/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Admin", "Property", "TradeType"]
    }),

    GetTradeTypes: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/tradeType/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET"
      }),
      providesTags: ["TradeType"]
    }),

    GetAllTradeTypes: builder.query({
      query: () => ({
        url: `/tradeType/`,
        method: "GET",
        params: { type: "all" }
      }),
      providesTags: ["TradeType"]
    }),

    removeTradeType: builder.mutation({
      query: (id) => ({
        url: `/tradeType/${id}`,
        method: "DELETE"
      }),

      invalidatesTags: ["TradeType", "Admin"]
    }),

    updateTradeType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/tradeType/${id}`,
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
