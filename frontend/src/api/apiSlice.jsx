import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Configuración básica de RTK Query
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  tagTypes: ["Test"],
  endpoints: (builder) => ({}),
});
