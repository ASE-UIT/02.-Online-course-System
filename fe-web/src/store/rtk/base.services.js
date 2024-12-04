import config from "@/config";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const fetchBaseQueryWithAuth = () =>
  fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");
      console.log("Token in fetchBaseQueryWithAuth:", token); // Log token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      console.log("Headers after preparation:", [...headers.entries()]); // Log headers
      return headers;
    },
  });
export const baseApi = createApi({
  reducerPath: "baseRTKApi",
  baseQuery: fetchBaseQueryWithAuth(),
  tagTypes: ["Course"],
  endpoints: () => ({}),
});
