import { kuarmoniaApi } from "../kuarmonia";

const UnitApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new unit
    addUnit: builder.mutation({
      query: (body) => ({
        url: "/unit/add-unit",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Unit", "User"],
    }),

    // get all units
    getUnits: builder.query({
      query: () => ({
        url: "/unit/get-units",
        method: "GET",
      }),

      providesTags: ["Unit"],
    }),

    // update unit
    updateUnit: builder.mutation({
      query: ({ id, body }) => ({
        url: `/unit/update-unit/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Unit", "User"],
    }),

    // get a unit
    getUnit: builder.query({
      query: (id) => ({
        url: `/unit/get-unit/${id}`,
        method: "GET",
      }),

      providesTags: ["Unit"],
    }),

    // delete a unit
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `/unit/delete-unit/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Unit", "User"],
    }),
  }),
});

export const {
  useAddUnitMutation,
  useGetUnitsQuery,
  useUpdateUnitMutation,
  useGetUnitQuery,
  useDeleteUnitMutation,
} = UnitApi;
