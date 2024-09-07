import { apiSlice } from "./apiSlice";

const testApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint para GET en /api/test
    getTest: builder.query({
      query: () => "test",
      providesTags: ["Test"],
    }),

    // Endpoint para POST en /api/test
    postTest: builder.mutation({
      query: (data) => ({
        url: "test",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Test"],
    }),
  }),
});

export const { useGetTestQuery, usePostTestMutation } = testApi;
