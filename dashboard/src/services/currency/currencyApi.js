import { kuarmoniaApi } from "../kuarmonia";

const CurrencyApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new currency
    addCurrency: builder.mutation({
      query: (body) => ({
        url: "/currency/add-currency",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Currency", "Admin"],
    }),

    // get all currencys
    getCurrencies: builder.query({
      query: () => ({
        url: "/currency/get-currencies",
        method: "GET",
      }),

      providesTags: ["Currency"],
    }),

    // update currency
    updateCurrency: builder.mutation({
      query: ({ id, body }) => ({
        url: `/currency/update-currency/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Currency", "Admin"],
    }),

    // get a currency
    getCurrency: builder.query({
      query: (id) => ({
        url: `/currency/get-currency/${id}`,
        method: "GET",
      }),

      providesTags: ["Currency"],
    }),

    // delete a currency
    deleteCurrency: builder.mutation({
      query: (id) => ({
        url: `/currency/delete-currency/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Currency", "Admin"],
    }),
  }),
});

export const {
  useAddCurrencyMutation,
  useGetCurrenciesQuery,
  useUpdateCurrencyMutation,
  useGetCurrencyQuery,
  useDeleteCurrencyMutation,
} = CurrencyApi;
