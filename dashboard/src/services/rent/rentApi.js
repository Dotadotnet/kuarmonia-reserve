import { kuarmoniaApi } from "../kuarmonia";

const rentApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addRent: builder.mutation({
      query: (body) => ({
        url: "/rent/add-rent",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Rent",
      ],
    }),

    getRents: builder.query({
      query: () => ({
        url: `/rent/get-rents/`,
        method: "GET",
      }),
      providesTags: ["Rent"],
    }),

    removeRent: builder.mutation({
      query: (id) => ({
        url: `/rent/delete-rent/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Rent", "Admin"],
    }),

    updateRent: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/rent/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Rent"],
    }),
  }),
});

export const {
  useAddRentMutation,
  useGetRentsQuery,
  useUpdateRentMutation,
  useRemoveRentMutation
} = rentApi;
