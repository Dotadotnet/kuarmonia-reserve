import { kuarmoniaApi } from "../kuarmonia";

const employmentTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
   addEmploymentType: builder.mutation({
      query: (body) => ({
        url: "/employmentType/add-employmentType",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["EmploymentType", "Admin"],
    }),
    
    getEmploymentTypes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/employmentType/get-employmentTypes/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET"
      }),

      providesTags: ["EmploymentType"]
    }),

    // update employmentType
    updateEmploymentType: builder.mutation({
      query: ({ id, body }) => ({
        url: `/employmentType/update-employmentType/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),

      invalidatesTags: ["EmploymentType", "Admin"]
    }),

    // get a employmentType
    getEmploymentType: builder.query({
      query: (id) => ({
        url: `/employmentType/get-employmentType/${id}`,
        method: "GET"
      }),

      providesTags: ["EmploymentType"]
    }),

    // delete employmentType
    deleteEmploymentType: builder.mutation({
      query: (id) => ({
        url: `/employmentType/delete-employmentType/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["EmploymentType", "Admin"]
    })
  })
});

export const {
  useAddEmploymentTypeMutation,
  useGetEmploymentTypesQuery,
  useUpdateEmploymentTypeMutation,
  useGetEmploymentTypeQuery,
  useDeleteEmploymentTypeMutation
} = employmentTypeApi;
