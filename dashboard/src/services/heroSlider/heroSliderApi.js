import { kuarmoniaApi } from "../kuarmonia";

const heroSliderApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addHeroSlider: builder.mutation({
      query: (heroSlider) => ({
        url: "/hero-slider/add-hero-slider",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: heroSlider,
      }),
      invalidatesTags: ["HeroSlider", "Admin"],
    }),

    getHeroSliders: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/hero-slider/get-hero-sliders?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["HeroSlider"],
    }),

    updateHeroSlider: builder.mutation({
      query: ({ id, body }) => ({
        url: `/hero-slider/update-hero-slider/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: ["HeroSlider", "Admin"],
    }),

    // Add mutation for updating heroSlider IDs
    updateHeroSliderIds: builder.mutation({
      query: (heroSliders) => ({
        url: `/hero-slider/update-hero-slider-ids`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: { heroSliders },
      }),
      invalidatesTags: ["HeroSlider"],
    }),

    getHeroSlider: builder.query({
      query: (id) => ({
        url: `/hero-slider/get-hero-slider/${id}`,
        method: "GET",
      }),
      providesTags: ["HeroSlider"],
    }),

    deleteHeroSlider: builder.mutation({
      query: (id) => ({
        url: `/hero-slider/delete-hero-slider/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["HeroSlider", "Admin"],
    }),
  }),
});

export const {
  useAddHeroSliderMutation,
  useGetHeroSlidersQuery,
  useUpdateHeroSliderMutation,
  useUpdateHeroSliderIdsMutation,
  useGetHeroSliderQuery,
  useDeleteHeroSliderMutation,
} = heroSliderApi;

export default heroSliderApi;