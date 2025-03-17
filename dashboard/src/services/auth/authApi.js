import { kuarmoniaApi } from "../kuarmonia";

const authApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // signUp
    signUp: builder.mutation({
      query: (body) => {
        return {
          url: "/admin/sign-up",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    

    // signIn
    signIn: builder.mutation({
      query: (body) => ({
        url: "/admin/sign-in",
        method: "POST",
        body,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/admin/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

   // persist login
    persistLogin: builder.query({
      query: () => ({
        url: "/admin/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),
    userLogout: builder.mutation({
      query: (body) => ({
        url: "/user/logout",
        method: "POST",
        body
      })
    })
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  usePersistLoginQuery,
  useForgotPasswordMutation,
  useUserLogoutMutation

} = authApi;
