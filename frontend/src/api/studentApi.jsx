import { apiSlice } from "./apiSlice";

const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchStudent: builder.query({
      query: (email) => `student/search/${encodeURIComponent(email)}`,
    }),
    getPendingCompaniesRequest: builder.query({
      query: () => `student/pending-companies`,
    }),
  }),
});

export const { useSearchStudentQuery, useLazySearchStudentQuery, useGetPendingCompaniesRequestQuery } = studentApi;
