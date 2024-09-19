import { apiSlice } from "./apiSlice";

const academicPeriodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicPeriods: builder.query({
      query: () => "docente/academic-periods",
    }),
    createAcademicPeriod: builder.mutation({
      query: (data) => ({
        url: "docente/academic-periods",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getAcademicPeriodsGroupedByTeacher: builder.query({
      query: () => "academic-periods/grouped-by-teacher",
    }),
    enrollInAcademicPeriod: builder.mutation({
      query: (data) => ({
        url: "academic-periods/enroll",
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
  useGetAcademicPeriodsQuery,
  useCreateAcademicPeriodMutation,
  useGetAcademicPeriodsGroupedByTeacherQuery,
  useEnrollInAcademicPeriodMutation,
} = academicPeriodApi;
