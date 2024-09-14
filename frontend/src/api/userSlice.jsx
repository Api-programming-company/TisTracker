import { apiSlice } from "./apiSlice";
const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint para POST en /registro_usuario
    registrarUsuario: builder.mutation({
      query: (data) => ({
        url: "registro_usuario",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    // Nuevo Endpoint para GET en /check-email
    checkEmail: builder.query({
      query: (email) => `check-email?email=${encodeURIComponent(email)}`,
    }),
    // Nuevo Endpoint para POST en /verify-email
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: "verify-email",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { token },
      }),
    }),
  }),
});

export const {
  useRegistrarUsuarioMutation,
  useLazyCheckEmailQuery,
  useVerifyEmailMutation,
} = userApi;
