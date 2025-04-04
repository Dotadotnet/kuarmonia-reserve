const { kuarmoniaApi } = require("../kuarmonia");

const authApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (body) => ({
        url: "/auth/logout",
        method: "POST",
        body
      })
    })
  })
});

export const { useLogoutMutation } = authApi;
