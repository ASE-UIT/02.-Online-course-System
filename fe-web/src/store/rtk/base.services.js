import config from "@/config";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const fetchBaseQueryWithAuth = () =>
  fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: (headers) => {
      const auth = localStorage.getItem("auth");
      const token = JSON.parse(auth) || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
export const baseApi = createApi({
  reducerPath: "baseRTKApi",
  baseQuery: fetchBaseQueryWithAuth(),
  tagTypes: ["Course", "Quizzes","Progress"],
  endpoints: () => ({}),
});
