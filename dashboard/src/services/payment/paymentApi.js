

const { kuarmoniaApi } = require("../kuarmonia");

const paymentApi = kuarmoniaApi.injectEndpoints({
  endpoints: (build) => ({
    // create payment
    createPayment: build.mutation({
      query: (body) => ({
        url: "/payment/create-payment",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
