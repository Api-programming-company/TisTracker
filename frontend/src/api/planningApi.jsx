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
  }),
});

export const {
  useRegisterPlanningMutation
} = planningAPI;
