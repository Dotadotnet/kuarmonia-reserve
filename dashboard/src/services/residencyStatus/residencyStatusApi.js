import { kuarmoniaApi } from "../kuarmonia";

const residencyStatusApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
   addResidencyStatus: builder.mutation({
      query: (body) => ({
        url: "/residencyStatus/add-residencyStatus",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["ResidencyStatus", "Admin"],
    }),
    
    getResidencyStatuss: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/residencyStatus/get-residencyStatuss/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET"
      }),

      providesTags: ["ResidencyStatus"]
    }),

    // update residencyStatus
    updateResidencyStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/residencyStatus/update-residencyStatus/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),

      invalidatesTags: ["ResidencyStatus", "Admin"]
    }),

    // get a residencyStatus
    getResidencyStatus: builder.query({
      query: (id) => ({
        url: `/residencyStatus/get-residencyStatus/${id}`,
        method: "GET"
      }),

      providesTags: ["ResidencyStatus"]
    }),

    // delete residencyStatus
    deleteResidencyStatus: builder.mutation({
      query: (id) => ({
        url: `/residencyStatus/delete-residencyStatus/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["ResidencyStatus", "Admin"]
    })
  })
});

export const {
  useAddResidencyStatusMutation,
  useGetResidencyStatussQuery,
  useUpdateResidencyStatusMutation,
  useGetResidencyStatusQuery,
  useDeleteResidencyStatusMutation
} = residencyStatusApi;
