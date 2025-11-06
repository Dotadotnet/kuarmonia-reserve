import { kuarmoniaApi } from "../kuarmonia";

const serviceApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addService: builder.mutation({
      query: (body) => ({
        url: "/service/add-service",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Admin",
        "Service",
      ],
    }),

    getServices: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        if (search) params.append('search', search);
        
        return {
          url: `/service/get-services/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),

    getAllServices: builder.query({
      query: () => ({
        url: `/service/get-all-services`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    getService: builder.query({
      query: (id) => ({
        url: `/service/get-service/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    removeService: builder.mutation({
      query: (id) => ({
        url: `/service/delete-service/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Service", "Admin"],
    }),

    updateService: builder.mutation({
      query: ({ id, body }) => ({
        url: `/service/update-service/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useGetAllServicesQuery,
  useGetServiceQuery,
  useUpdateServiceMutation,
  useRemoveServiceMutation
} = serviceApi;