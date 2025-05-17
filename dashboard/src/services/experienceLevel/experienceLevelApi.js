import { kuarmoniaApi } from "../kuarmonia";

const experienceLevelApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
   addExperienceLevel: builder.mutation({
      query: (body) => ({
        url: "/experienceLevel/add-experienceLevel",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["ExperienceLevel", "Admin"],
    }),
    
    getExperienceLevels: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/experienceLevel/get-experienceLevels/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET"
      }),

      providesTags: ["ExperienceLevel"]
    }),

    // update experienceLevel
    updateExperienceLevel: builder.mutation({
      query: ({ id, body }) => ({
        url: `/experienceLevel/update-experienceLevel/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),

      invalidatesTags: ["ExperienceLevel", "Admin"]
    }),

    // get a experienceLevel
    getExperienceLevel: builder.query({
      query: (id) => ({
        url: `/experienceLevel/get-experienceLevel/${id}`,
        method: "GET"
      }),

      providesTags: ["ExperienceLevel"]
    }),

    // delete experienceLevel
    deleteExperienceLevel: builder.mutation({
      query: (id) => ({
        url: `/experienceLevel/delete-experienceLevel/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }),

      invalidatesTags: ["ExperienceLevel", "Admin"]
    })
  })
});

export const {
  useAddExperienceLevelMutation,
  useGetExperienceLevelsQuery,
  useUpdateExperienceLevelMutation,
  useGetExperienceLevelQuery,
  useDeleteExperienceLevelMutation
} = experienceLevelApi;
