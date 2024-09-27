import { apiSlice } from "./apiSlice";

const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateInvitationByCompanyId: builder.mutation({
      query: ({ id, data }) => ({
        url: `invitations/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    invitationDetailsById: builder.query({
      query: (id) => `invitations/${id}`,
    }),
  }),
});

export const {
  useUpdateInvitationByCompanyIdMutation,
  useInvitationDetailsByIdQuery
} = invitationApi;
