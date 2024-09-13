// src/features/api/apiSlice.js
import { apiSlice } from "./apiSlice";

const docenteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint para POST en /registro_docente
    registrarDocente: builder.mutation({
      query: (data) => ({
        url: "registrar_docente",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      // invalidatesTags: ['Docentes'],
    }),
    // Nuevo Endpoint para GET en /docentes/check-email
    checkEmail: builder.query({
      query: (email) =>
        `docente/check-email?email=${encodeURIComponent(email)}`,
    }),
  }),
});

export const { useRegistrarDocenteMutation, useLazyCheckEmailQuery } =
  docenteApi;
