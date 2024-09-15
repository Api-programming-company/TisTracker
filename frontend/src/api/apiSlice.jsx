import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Función para obtener el token CSRF
const fetchCsrfToken = async () => {
  try {
    console.log("getetetegetetet");
    
    const response = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};


// Configuración básica de RTK Query
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    // Asegúrate de obtener el CSRF token antes de hacer cualquier solicitud
    await fetchCsrfToken();
    
    // Luego realiza la solicitud con fetchBaseQuery
    return fetchBaseQuery({
      baseUrl: "http://localhost:8000/api/",
      credentials: "include", // Asegúrate de incluir las cookies en todas las solicitudes
    })(args, api, extraOptions);
  },
  tagTypes: ["Test"],
  endpoints: (builder) => ({}),
});
