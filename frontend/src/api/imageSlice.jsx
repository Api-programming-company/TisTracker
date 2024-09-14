import { apiSlice } from "./apiSlice";

const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint para subir imágenes
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "upload", // Cambia este valor según tu endpoint
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Images"], // Ajusta el tag según tu implementación
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;
