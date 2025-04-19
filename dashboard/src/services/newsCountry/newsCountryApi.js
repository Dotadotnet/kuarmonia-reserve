import { kuarmoniaApi } from "../kuarmonia";

const newsCountryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewsCountry: builder.mutation({
      query: (body) => ({
        url: "/newsCountry/add-newsCountry",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "NewsCountry",
      ],
    }),

    GetNewsCountries: builder.query({
      query: () => ({
        url: `/newsCountry/get-newsCountries`,
        method: "GET",
      }),
      providesTags: ["NewsCountry"],
    }),

    
    // get a newsCountry
    getNewsCountry: builder.query({
      query: (id) => ({
        url: `/newsCountry/get-newsCountry/${id}`,
        method: "GET",
      }),

      providesTags: ["NewsCountry"],
    }),

    removeNewsCountry: builder.mutation({
      query: (id) => ({
        url: `/newsCountry/delete-newsCountry/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["NewsCountry", "Admin"],
    }),

    updateNewsCountry: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/newsCountry/update-newsCountry/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["NewsCountry"],
    }),
  }),
});

export const {
  useAddNewsCountryMutation,
  useGetNewsCountriesQuery,
  useGetNewsCountryQuery,
  useUpdateNewsCountryMutation,
  useRemoveNewsCountryMutation
} = newsCountryApi;
