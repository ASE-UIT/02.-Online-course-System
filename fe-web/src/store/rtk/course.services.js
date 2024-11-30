import { baseApi } from "./base.services";
import { showToast } from "./toast";

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
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast({ type: "success", msg: "Cập nhật khóa học thành công", desc: "Khóa học đã được cập nhật" });
        } catch (error) {
          console.log(error);
          showToast({ type: "error", msg: "Cập nhật khóa học thất bại", desc: "Lỗi không xác định" });
        }
      },
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
