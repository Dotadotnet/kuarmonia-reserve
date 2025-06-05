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
    })
  })
});

export const { useGetTeamMembersQuery, useGetTeamLeaderQuery } = teamMebersApi;
