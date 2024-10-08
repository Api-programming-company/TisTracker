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
      query: ({ id, start_date, end_date }) => ({
        url: `academic-periods/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start_date, end_date }),
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
