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
    loginUser: builder.mutation({
      query: (data) => ({
        url: "user/login",
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
    checkUser: builder.query({
      query: () => 'user',
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyCheckEmailQuery,
  useVerifyEmailMutation,
  useCheckUserQuery,
} = userApi;
