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
  }),
});

export const {
  useUpdateInvitationByCompanyIdMutation
} = invitationApi;
