import { apiSlice } from "./apiSlice";

const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateInvitationById: builder.mutation({
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
  useUpdateInvitationByIdMutation,
  useInvitationDetailsByIdQuery
} = invitationApi;
