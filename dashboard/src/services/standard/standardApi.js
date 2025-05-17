import { kuarmoniaApi } from "../kuarmonia";

const standardApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addStandard: builder.mutation({
      query: (body) => ({
        url: "/standard/add-standard",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Standard",
      ],
    }),

    GetStandards: builder.query({
      query: () => ({
        url: `/standard/get-standards/`,
        method: "GET",
      }),
      providesTags: ["Standard"],
    }),

    removeStandard: builder.mutation({
      query: (id) => ({
        url: `/standard/delete-standard/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Standard", "Admin"],
    }),

    updateStandard: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/standard/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Standard"],
    }),
  }),
});

export const {
  useAddStandardMutation,
  useGetStandardsQuery,
  useUpdateStandardMutation,
  useRemoveStandardMutation
} = standardApi;
