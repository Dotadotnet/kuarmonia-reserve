import { kuarmoniaApi } from "../kuarmonia";

const countryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addCountry: builder.mutation({
      query: (body) => ({
        url: "/country/add-country",
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        body,
      }),
      invalidatesTags: ["Country", "Admin"],
    }),

    getCountries: builder.query({
      query: () => ({ url: "/country/get-countries", method: "GET" }),
      providesTags: ["Country"],
    }),

    getCountry: builder.query({
      query: (id) => ({ url: `/country/get-country/${id}`, method: "GET" }),
      providesTags: ["Country"],
    }),

    updateCountry: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/country/update-country/${id}`,
        method: "PATCH",
        body: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      }),
      invalidatesTags: ["Country"],
    }),

    removeCountry: builder.mutation({
      query: (id) => ({
        url: `/country/delete-country/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      }),
      invalidatesTags: ["Country", "Admin"],
    }),
  }),
});

export const {
  useAddCountryMutation,
  useGetCountriesQuery,
  useGetCountryQuery,
  useUpdateCountryMutation,
  useRemoveCountryMutation,
} = countryApi;











