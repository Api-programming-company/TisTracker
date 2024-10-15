import { apiSlice } from "./apiSlice";

const academicPeriodEvaluationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicPeriodEvaluationById: builder.query({
      query: (id) => ({
        url: `academic-period-evaluations/${id}`,
        method: "GET",
      }),
      providesTags: ["academic-period-evaluations"],
    }),
    createAcademicPeriodEvaluation: builder.mutation({
      query: (data) => ({
        url: "academic-period-evaluations",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["academic-period-evaluations"],
    }),
    updateAcademicPeriodEvaluation: builder.mutation({
      query: (id, data) => ({
        url: `academic-period-evaluations/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["academic-period-evaluations"],
    }),
    getAllAcademicPeriodEvaluations: builder.query({
      query: () => ({
        url: "academic-period-evaluations",
        method: "GET",
      }),
      providesTags: ["academic-period-evaluations"],
    }),
  }),
});

export const {
  useGetAcademicPeriodEvaluationByIdQuery,
  useCreateAcademicPeriodEvaluationMutation,
  useGetAllAcademicPeriodEvaluationsQuery,
  useUpdateAcademicPeriodEvaluationMutation,
} = academicPeriodEvaluationsApi;
