
import { kuarmoniaApi } from "../kuarmonia";

const adminApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all admins
    getAdmins: builder.query({
      query: () => ({
        url: "/admin/all-admins",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Admin"],
    }),

    // get admin
    getAdmin: builder.query({
      query: (id) => ({
        url: `/admin/get-admin/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Admin"],
    }),

    // update admin
    updateAdmin: builder.mutation({
      query: ({id,body}) => ({
        url: `/admin/update-admin/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Admin"],
    }),

    // admin single admin
    updateAdminInfo: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/update-information/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Admin"],
    }),

    // delete admin
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-admin/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Admin"],
    }),


    
  }),
});

export const {
  useGetAdminsQuery,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useUpdateAdminInfoMutation,
  useDeleteAdminMutation,
  useGetSellerRequestQuery,
  useReviewSellerMutation,
} = adminApi;
