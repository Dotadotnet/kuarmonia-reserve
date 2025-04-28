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
      query: () => ({
        url: `/service/get-services`,
        method: "GET",
       
      }),
      providesTags: ["Service"],
    }),

    removeService: builder.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Service", "Admin"],
    }),

    updateService: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
  useRemoveServiceMutation
} = serviceApi;
