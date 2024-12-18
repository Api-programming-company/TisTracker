import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/",
        credentials: "include",
        prepareHeaders: (headers) => {
            const timezone = getTimezone();
            headers.set("Timezone", timezone);
            return headers;
        },
        tagTypes: ["company", "evaluation", "invitation"],
    }),
    endpoints: (builder) => ({}),
});
