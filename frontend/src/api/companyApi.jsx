import { apiSlice } from "./apiSlice";

const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (data) => ({
        url: "company",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getCompanyById: builder.query({
      query: (id) => ({
        url: `company/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateCompanyMutation, useGetCompanyByIdQuery } = companyApi;
