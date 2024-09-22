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
    getPedingCompanies: builder.query({
      query: (id) => ({
        url: `academic-periods/companies/pending?academic_period_id=${id}`,
        method: "GET",
      }),
    }),
    acceptCompanyById: builder.mutation({
      query: (id) => ({
        url: `companies/accept/${id}`,
        method: "POST",
      }),
    }),
    updateCompanyById: builder.mutation({
      query: ({ id, data }) => ({
        url: `company/${id}`,
        method: "PUT", // O `PATCH` según lo necesites
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useGetPedingCompaniesQuery,
  useAcceptCompanyByIdMutation,
  useUpdateCompanyByIdMutation
} = companyApi;
