import { apiSlice } from "./apiSlice";

const academicPeriodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicPeriodById: builder.query({
      query: (id) => `academic-periods/${id}`,
    }),
    getAcademicPeriods: builder.query({
      query: () => "academic-periods",
    }),
    updateAcademicPeriodById: builder.mutation({
      query: (id, data) => ({
        url: `academic-periods/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    createAcademicPeriod: builder.mutation({
      query: (data) => ({
        url: "academic-periods",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getAcademicPeriodsGroupedByTeacher: builder.query({
      query: () => "grouped-by-teacher",
    }),
    enrollInAcademicPeriod: builder.mutation({
      query: (data) => ({
        url: "enroll",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getCompaniesByAcademicPeriod: builder.query({
      query: (academicPeriodId) => `pending-companies?id=${academicPeriodId}`,
    }),
  }),
});

export const {
  useGetAcademicPeriodByIdQuery,
  useGetAcademicPeriodsQuery,
  useUpdateAcademicPeriodByIdMutation,
  useCreateAcademicPeriodMutation,
  useGetAcademicPeriodsGroupedByTeacherQuery,
  useEnrollInAcademicPeriodMutation,
  useGetCompaniesByAcademicPeriodQuery,
} = academicPeriodApi;
