const { kuarmoniaApi } = require("../kuarmonia");

const authApi = kuarmoniaApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // signin
    signinPhone: builder.mutation({
      query: (body) => ({
        url: "/user/signin-phone",
        method: "POST",
        body
      })
    }),

    // verify
    verify: builder.mutation({
      query: (body) => ({
        url: "/user/verify",
        method: "POST",
        body
      })
    }),

      // verify
      addName: builder.mutation({
        query: (body) => ({
          url: "/user/name",
          method: "POST",
          body
        })
      }),

    signinGoogle: builder.mutation({
      query: (body) => ({
        url: "/user/signin-google",
        method: "POST",
        body
      })
    }),

    persistUser: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      providesTags: ["User", "Cart", "Rent", "Favorite", "Purchase", "Review"]
    }),

    userLogout: builder.mutation({
      query: (body) => ({
        url: "/user/logout",
        method: "POST",
        body
      })
    })
  })
});

export const {
  useSigninPhoneMutation,
  useVerifyMutation,
  useAddNameMutation,
  useSigninGoogleMutation,
  useForgotPasswordMutation,
  usePersistUserQuery,
  useUserLogoutMutation
} = authApi;
