

import { kuarmoniaApi } from "../kuarmonia";

const socialLinkApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addSocialLink: builder.mutation({
      query: (socialLink) => ({
        url: "/socialLink/add-socialLink",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: socialLink,
      }),

      invalidatesTags: ["SocialLink", "User"],
    }),

    // get all socialLinks
    getSosialLinks: builder.query({
      query: () => ({
        url: "/socialLink/get-socialLinks",
        method: "GET",
      }),

      providesTags: ["SocialLink"],
    }),

    // update socialLink
    updateSocialLink: builder.mutation({
      query: ({ id, body }) => ({
        url: `/socialLink/update-socialLink/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["SocialLink", "User"],
    }),

    // get a socialLink
    getSocialLink: builder.query({
      query: (id) => ({
        url: `/socialLink/get-socialLink/${id}`,
        method: "GET",
      }),

      providesTags: ["SocialLink"],
    }),

    // delete socialLink
    deleteSocialLink: builder.mutation({
      query: (id) => ({
        url: `/socialLink/delete-socialLink/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["SocialLink", "User"],
    }),
  }),
});

export const {
  useAddSocialLinkMutation,
  useGetSosialLinksQuery,
  useUpdateSocialLinkMutation,
  useGetSocialLinkQuery,
  useDeleteSocialLinkMutation,
} = socialLinkApi;
