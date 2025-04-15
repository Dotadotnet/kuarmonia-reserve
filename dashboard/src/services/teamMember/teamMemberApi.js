import { kuarmoniaApi } from "../kuarmonia";

const teamMemberApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addTeamMember: builder.mutation({
      query: (body) => ({
        url: "/teamMember/add-teamMember",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body
      }),
      invalidatesTags: ["Admin", "Property", "TeamMember"]
    }),

    GetTeamMembers: builder.query({
      query: () => ({
        url: `/teamMember/get-teamMembers`,
        method: "GET"
      }),
      providesTags: ["TeamMember"]
    }),



    removeTeamMember: builder.mutation({
      query: (id) => ({
        url: `/teamMember/delete-teamMember/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
      }),
  
      invalidatesTags: ["TeamMember", "Admin"]
    }),

    updateTeamMember: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/teamMember/update-teamMember${id}`,
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: ["TeamMember"]
    })
  })
});

export const {
  useAddTeamMemberMutation,
  useGetTeamMembersQuery,
  useGetAllTeamMembersQuery,
  useUpdateTeamMemberMutation,
  useRemoveTeamMemberMutation
} = teamMemberApi;
