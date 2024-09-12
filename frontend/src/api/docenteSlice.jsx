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
      // Puedes invalidar otros tags si es necesario
      // invalidatesTags: ['Docentes'], 
    }),
  }),
});

export const { useRegistrarDocenteMutation } = docenteApi;
