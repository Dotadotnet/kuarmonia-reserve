import { kuarmoniaApi } from "../kuarmonia";

const storyApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addStory: builder.mutation({
      query: (story) => ({
        url: "/story/add-story",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: story,
      }),

      invalidatesTags: ["Story", "Admin"],
    }),

    // get all stories (both parent and child)
    getAllStories: builder.query({
      query: () => ({
        url: `/story/get-all-stories/`,
        method: "GET",
      }),

      providesTags: ["Story"],
    }),

    // get all stories
    getStories: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/story/get-stories/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),

      providesTags: ["Story"],
    }),

    // update story
    updateStory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/story/update-story/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Story", "Admin"],
    }),

    // update story order
    updateStoryOrder: builder.mutation({
      query: (stories) => ({
        url: `/story/update-story-order`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: { stories },
      }),

      invalidatesTags: ["Story"],
    }),

    // get a story
    getStory: builder.query({
      query: (id) => ({
        url: `/story/get-story/${id}`,
        method: "GET",
      }),

      providesTags: ["Story"],
    }),

    // delete story
    deleteStory: builder.mutation({
      query: (id) => ({
        url: `/story/delete-story/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Story", "Admin"],
    }),
  }),
});

export const {
  useAddStoryMutation,
  useGetStoriesQuery,
  useGetAllStoriesQuery,
  useUpdateStoryMutation,
  useGetStoryQuery,
  useDeleteStoryMutation,
  useUpdateStoryOrderMutation,
} = storyApi;
