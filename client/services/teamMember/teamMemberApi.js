const { kuarmoniaApi } = require("../kuarmonia");

const teamMebersApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: ({ locale }) => ({
        url: `/teamMember/get-teamMembers`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "accept-language": locale || "fa"
        }
      })
    }),
    getTeamLeader: builder.query({
      query: ({ locale }) => ({
        url: `/teamMember/get-leader`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "accept-language": locale || "fa"
        }
      })
    }),
    getTeamMember: builder.query({
      query: ({ id, locale }) => ({
        url: `/teamMember/get-teamMember/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "accept-language": locale || "fa"
        }
      })
    }),
    addTeamMember: builder.mutation({
      query: (formData) => ({
        url: "/teamMember/add-teamMember",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
      })
    }),
    updateTeamMember: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/teamMember/update-teamMember/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
      })
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/teamMember/delete-teamMember/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
    })
  })
});

export const { 
  useGetTeamMembersQuery, 
  useGetTeamLeaderQuery,
  useGetTeamMemberQuery,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation
} = teamMebersApi;