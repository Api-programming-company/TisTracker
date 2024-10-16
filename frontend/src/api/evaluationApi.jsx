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
      invalidatesTags: ["evaluation"],
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
      invalidatesTags: ["evaluation"],
    }),
    getCompanyQuestionsById: builder.query({
      query: (id) => ({
        url: `evaluations/${id}`,
        method: "GET",
      }),
      providesTags: ["evaluation"],
    }),
    createEvaluationTemplate: builder.mutation({
      query: (data) => ({
        url: "evaluations",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["evaluation"],
    }),
    getAllEvaluationTemplates: builder.query({
      query: () => ({
        url: "evaluations",
        method: "GET",
      }),
      providesTags: ["evaluation"],
    }),
    updateEvaluationTemplate: builder.mutation({
      query: ({ id, data }) => ({
        url: `evaluations/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["evaluation"],
    }),
  }),
});

export const {
  useCreateUserEvaluationMutation,
  useCreateCompanyEvaluationMutation,
  useGetCompanyQuestionsByIdQuery,
  useCreateEvaluationTemplateMutation,
  useGetAllEvaluationTemplatesQuery,
  useUpdateEvaluationTemplateMutation,
} = evaluationApi;
