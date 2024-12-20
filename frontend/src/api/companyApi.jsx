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
        leaveCompany: builder.mutation({
            query: ({ companyId }) => ({
                url: `companies/${companyId}/leave`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
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
                url: `plannings/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["company", "invitation"],
        }),
        getEvaluationByCompanyId: builder.query({
            query: ({ id, evaluation_type }) => ({
                url: `evaluation-company/${id}/${evaluation_type}`,
                method: "GET",
            }),
            providesTags: ["company", "evaluation"],
        }),
        getEvaluationByCompanyUserId: builder.query({
            query: ({ id }) => ({
                url: `evaluation-company-user/${id}`,
                method: "GET",
            }),
            providesTags: ["company-user", "evaluation"],
        }),
        removeMember: builder.mutation({
            query: ({ companyId, userId }) => ({
                url: `companies/${companyId}/members/${userId}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
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
    useGetEvaluationByCompanyIdQuery,
    useGetEvaluationByCompanyUserIdQuery,
    useLeaveCompanyMutation,
    useRemoveMemberMutation,
} = companyApi;
