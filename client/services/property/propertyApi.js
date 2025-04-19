const { kuarmoniaApi } = require("../kuarmonia");

const propertyApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addProperty: builder.mutation({
      query: (body) => ({
        url: "/property/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Property"],
    }),

    getProperties: builder.query({
      query: ({ page = 1, limit = 7, search = "", adminId }) => ({
        url: `/property/properties`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getPropertyTypes: builder.query({
      query: () => ({
        url: "/property?type=type",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getSaleTypes: builder.query({
      query: () => ({
        url: "/property?type=sale",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getTradeTypes: builder.query({
      query: () => ({
        url: "/property?type=trade",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getProperty: builder.query({
      query: (id) => ({
        url: `/property/${id}`,
        method: "GET",
      }),
      providesTags: ["Property"],
    }),

    getAllProperties: builder.query({
      query: () => ({
        url: `/property/`,
        method: "GET",
        params: { type: "client" },
      }),
      providesTags: ["Property", "Tag", "User", "Category"],
    }),

    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/property/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Property", "User", "Category", "Tag", "Like", "Comment", "view"],
    }),

    updateProperty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/property/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useAddPropertyMutation,
  useGetPropertiesQuery, 
  useGetAllPropertiesQuery,
  useDeletePropertyMutation,
  useGetPropertyQuery,
  useUpdatePropertyMutation,
  useGetSaleTypesQuery, 
  useGetTradeTypesQuery, 
  useGetPropertyTypesQuery,
} = propertyApi;
