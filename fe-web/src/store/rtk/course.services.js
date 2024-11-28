import config from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseRTKApi = createApi({
  reducerPath: "courseRTKApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["course"],
  endpoints: (build) => ({
    getCourses: build.query({
      query: (body) => ({
        url: `/course/paging?rpp=${body.limit}&page${body.page}`,
      }),
    }),
    getCourseById: build.query({
      query: (courseId) => ({
        url: `course/${courseId}`,
      }),
      providesTags: (result, error, courseId) => [{ type: "Course", id: courseId }],
    }),
    updateCourse: build.mutation({
      query: ({ courseId, payload }) => ({
        url: `course/${courseId}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { courseId }) => [{ type: "Course", id: courseId }],
    }),
    getCategories: build.query({
      query: () => ({
        url: `/course-category/`,
      }),
    }),
  }),
});
export const { useGetCoursesQuery, useGetCourseByIdQuery, useGetCategoriesQuery, useUpdateCourseMutation } =
  courseRTKApi;
