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
    logoutUser: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
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
    leaveAcademicPeriod: builder.mutation({
      query: () => ({
        url: "user/leave-academic-period",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      }),
    }),
    checkUser: builder.query({
      query: () => "user",
    }),
    getGrades: builder.query({
      query: ({academic_period_id, limit}) => `grades?academic_period_id=${academic_period_id}&limit=${limit}`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
  useLazyCheckUserQuery,
  useGetGradesQuery,
  useLeaveAcademicPeriodMutation,
} = userApi;
