import { baseApi } from "./base.services";

export const courseRTKApi = baseApi.injectEndpoints({
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