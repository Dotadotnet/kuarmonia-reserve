import { kuarmoniaApi } from "../kuarmonia";

const typeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addType: builder.mutation({
      query: (body) => ({
        url: "/type/",
        method: "POST",
   
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Property",
        "Type",
      ],
    }),

    GetTypes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/type/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Type"],
    }),

    removeType: builder.mutation({
      query: (id) => ({
        url: `/type/${id}`,
        method: "DELETE",

      }),

      invalidatesTags: ["Type", "Admin"],
    }),

    updateType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/type/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Type"],
    }),
  }),
});

export const {
  useAddTypeMutation,
  useGetTypesQuery,
  useUpdateTypeMutation,
  useRemoveTypeMutation
} = typeApi;
