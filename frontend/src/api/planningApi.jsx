import { apiSlice } from "./apiSlice";

const planningAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerPlanning: builder.mutation({
      query: (data) => ({
        url: "plannings",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    getPlanningByRealCompanyId: builder.query({
      query: (id) => ({
        url: `company/${id}/planning`,
        method: "GET",
      }),
    }),
    getPlanningByCompanyId: builder.query({
      query: (id) => ({
        url: `plannings/${id}`,
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useGetPlanningByRealCompanyIdQuery,
  useRegisterPlanningMutation,
  useGetPlanningByCompanyIdQuery
  
} = planningAPI;
