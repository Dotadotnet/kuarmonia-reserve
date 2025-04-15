const { kuarmoniaApi } = require("../kuarmonia");

const teamMebersApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMebers: builder.query({
      query: () => ({
        url: `/teamMember/get-teamMembers`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
    }),
    getTeamLeader: builder.query({
      query: () => ({
        url: `/teamMember/get-leader`, // API جدید برای دریافت رهبر تیم
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
    })
  })
});

export const { useGetTeamMebersQuery, useGetTeamLeaderQuery } = teamMebersApi;
