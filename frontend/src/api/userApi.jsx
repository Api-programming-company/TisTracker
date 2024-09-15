import { apiSlice } from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    checkEmail: builder.query({
      query: (email) => `user/check-email?email=${encodeURIComponent(email)}`,
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: "user/verify-email",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { token },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLazyCheckEmailQuery,
  useVerifyEmailMutation,
} = userApi;
