import { kuarmoniaApi } from "../kuarmonia";

const typeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addType: builder.mutation({
      query: (body) => ({
        url: "/propType/add-propType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Property",
        "PropType",
      ],
    }),

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

    removeType: builder.mutation({
      query: (id) => ({
        url: `/propType/delete-propType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),

      invalidatesTags: ["PropType", "Admin"],
    }),

    updateType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/propType/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),
      invalidatesTags: ["PropType"],
    }),
  }),
});

export const {
  useAddTypeMutation,
  useGetTypesQuery,
  useUpdateTypeMutation,
  useRemoveTypeMutation
} = typeApi;
