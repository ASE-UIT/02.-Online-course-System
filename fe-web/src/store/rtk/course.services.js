import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseRTKApi = createApi({
  reducerPath: "courseRTKApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
  tagTypes: ["course"],
  endpoints: (build) => ({
    getCourses: build.query({
      query: (body) => ({
        url: `/course/paging?rpp=${body.limit}&page${body.page}`,
      }),
    }),
    getCategories: build.query({
      query: () => ({
        url: `/course-category/`,
      }),
    }),
  }),
});
export const { useGetCoursesQuery, useGetCategoriesQuery } = courseRTKApi;
