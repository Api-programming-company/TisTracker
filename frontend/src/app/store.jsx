import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authMiddleware from "./authMiddleware";
import { planningSlice } from "../reducers/planningSlice";

export const store = configureStore({
  reducer: {
    planning : planningSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authMiddleware),
});

export default store;
