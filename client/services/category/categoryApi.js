import { kuarmoniaApi } from "../kuarmonia";

const categoryApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (body) => ({
        url: "/category/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: ["Category"], // این باید دقیقا با providesTags یکسان باشد
    }),
    
    getCategories: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/category/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "x-lang": "fa"
        }
      }),

      providesTags: ["Category"],
    }),

    getCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Category"],
    }),
    

    getCategoriesForDropDownMenu: builder.query({
      query: () => ({
        url: "/category/",
        method: "GET",
        params: { type: "dropdown" }, 
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Category"], 
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoriesForDropDownMenuQuery,
  useUpdateCategoryMutation,
    useDeleteCategoryMutation,
  
} = categoryApi;
