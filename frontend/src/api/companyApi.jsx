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
      invalidatesTags: ["company", "invitation"],
    }),
    getCompanyById: builder.query({
      query: (id) => ({
        url: `company/${id}`,
        method: "GET",
      }),
      providesTags: ["company", "invitation"],
    }),
    getPedingCompanies: builder.query({
      query: (id) => ({
        url: `academic-periods/companies/pending?academic_period_id=${id}`,
        method: "GET",
      }),
      providesTags: ["company", "invitation"],
    }),
    getCompanies: builder.query({
      query: () => ({
        url: "company",
        method: "GET",
      }),
      providesTags: ["company", "invitation"],
    }),
    updateCompanyById: builder.mutation({
      query: ({ id, data }) => ({
        url: `company/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["company", "invitation"],
    }),
    updateCompanyPlanningById: builder.mutation({
      query: ({ id, data }) => ({
        url: `plannings/${id}`, // Cambiado a /companyplanning
        method: "PUT", // O `PATCH` según lo necesites
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["company", "invitation"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useGetPedingCompaniesQuery,
  useGetCompaniesQuery,
  useUpdateCompanyByIdMutation,
  useUpdateCompanyPlanningByIdMutation,
} = companyApi;
