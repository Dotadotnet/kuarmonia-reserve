import { kuarmoniaApi } from "../kuarmonia";

const typeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({


    GetTypes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/propType/get-propTypes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),
      providesTags: ["PropType"],
    }),

  }),
});

export const {
  useGetTypesQuery,
} = typeApi;
