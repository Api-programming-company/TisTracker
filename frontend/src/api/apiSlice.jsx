import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Función para obtener el token CSRF
const fetchCsrfToken = async () => {
  try {
    const response = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    // Obtener el CSRF token antes de hacer cualquier solicitud
    await fetchCsrfToken();

    // Realiza la solicitud con fetchBaseQuery
    const baseQuery = fetchBaseQuery({
      baseUrl: "http://localhost:8000/api/",
      credentials: "include", // incluir las cookies en todas las solicitudes
    });

    const result = await baseQuery(args, api, extraOptions);
    return result;
  },
  tagTypes: ["Test"],
  endpoints: (builder) => ({}),
});
