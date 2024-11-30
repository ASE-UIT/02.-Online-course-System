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
    getCoursesByCategoryId: build.query({
      query: ({ categoryId, limit, page }) => ({
        url: `/course/paging?rpp=${limit}&page=${page}`, // Same query, no change to the backend
      }),
    }),
    getCoursesByLecturerId: build.query({
      query: ({ lecturerId, limit, page }) => ({
        url: `/course/paging?lecturerId=${lecturerId}&rpp=${limit}&page=${page}`, // Modify URL to fetch by lecturerId
      }),
    }),
    createCourse: build.mutation({
      query: (payload) => ({
        url: `/course`,
        body: payload,
        method: "POST",
      }),
    }),
  }),
});
export const { useGetCoursesQuery, useGetCourseByIdQuery, useGetCategoriesQuery, useUpdateCourseMutation, useGetCoursesByCategoryIdQuery, useGetCoursesByLecturerIdQuery, useCreateCourseMutation  } =
  courseRTKApi;
