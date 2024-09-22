import { apiSlice } from "./apiSlice";

const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchStudent: builder.query({
      query: (email) => `student/search/${encodeURIComponent(email)}`,
    }),
  }),
});

export const { useSearchStudentQuery, useLazySearchStudentQuery } = studentApi;
