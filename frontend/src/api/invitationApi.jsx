import { apiSlice } from "./apiSlice";

const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvitation: builder.mutation({
      query: (data) => ({
        url: `invitations/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["invitation", "company"],
    }),
    updateInvitationById: builder.mutation({
      query: ({ id, data }) => ({
        url: `invitations/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["invitation", "company"],
    }),
    invitationDetailsById: builder.query({
      query: (id) => `invitations/${id}`,
      providesTags: ["invitation", "company"],
    }),
    deleteInvitationById: builder.mutation({
      query: (id) => ({
        url: `invitations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invitation", "company"],
    }),
  }),
});

export const {
  useUpdateInvitationByIdMutation,
  useInvitationDetailsByIdQuery,
  useCreateInvitationMutation,
  useDeleteInvitationByIdMutation,
} = invitationApi;
