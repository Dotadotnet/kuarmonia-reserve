
import { kuarmoniaApi } from "../kuarmonia";

const propertyApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new property
    addProperty: builder.mutation({
      query: (body) => ({
        url: "/property/add-property",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Property", "Category", "Admin"]
    }),

    // get all properties
    getProperties: builder.query({
      query: () => ({
        url: "/property/get-properties",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Accept-Language": "fa" // اضافه کردن زبان فارسی
        }
      }),
      providesTags: ["Property"]
    }),
    


    // update property
    updateProperty: builder.mutation({
      query: ({ id, body }) => ({
        url: `/property/update-property/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Property", "Category", "Admin"]
    }),

    // get a single property
    getProperty: builder.query({
      query: (id) => ({
        url: `/property/get-property/${id}`,
        method: "GET"
      }),
      providesTags: ["Property"]
    }),

    // delete property
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/property/delete-property/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),
      invalidatesTags: ["Property", "Category", "Admin"]
    }),

   
  })
});


export const {
  useAddPropertyMutation,
  useGetPropertiesQuery, 
  useDeletePropertyMutation,
  useGetPropertyQuery,
  useUpdatePropertyMutation,

} = propertyApi;
