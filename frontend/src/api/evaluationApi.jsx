import { apiSlice } from "./apiSlice";

const evaluationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUserEvaluation: builder.mutation({
      query: (data) => ({
        url: "user-evaluations",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    createCompanyEvaluation: builder.mutation({
      query: (data) => ({
        url: "company-user-evaluation",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserEvaluationMutation,
  useCreateCompanyEvaluationMutation,
} = evaluationApi;
