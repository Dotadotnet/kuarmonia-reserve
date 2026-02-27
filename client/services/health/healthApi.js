import { kuarmoniaApi } from "../kuarmonia";

const healthApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    getHealth: builder.query({
      query: () => ({
        url: "/api/health",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHealthQuery } = healthApi;
