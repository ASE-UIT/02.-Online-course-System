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
    getCoursesByCategoryId: build.query({
      query: ({ categoryId, limit, page }) => ({
        url: `/course/paging?rpp=${limit}&page=${page}`, 
      }),
    }),
    getCoursesByLecturerId: build.query({
      query: ({ lecturerId, limit, page }) => ({
        url: `/course/paging?lecturerId=${lecturerId}&rpp=${limit}&page=${page}`, 
      }),
    }),
    createCourse: build.mutation({
      query: (payload) => ({
        url: `/course`,
        body: payload,
        method: "POST",
      }),
    }),
    searchCourses: build.query({
      query: ({ filter, sort, rpp, page }) => {
        // Constructing the parameters
        const params = {
          filter: JSON.stringify(filter),
          sort: JSON.stringify(sort),
          rpp,
          page,
        };
        
        // Constructing the full URL with parameters
        const fullUrl = `course/search?${new URLSearchParams(params).toString()}`;
        
        return { url: fullUrl, method: 'GET' };
      },
      providesTags: (result, error, { filter, sort, rpp, page }) => [
        { type: "SearchResults", id: `${JSON.stringify(filter)}-${JSON.stringify(sort)}-${rpp}-${page}` },
      ],
    }),
  }),
});
export const { useGetCoursesQuery, useGetCourseByIdQuery, useGetCategoriesQuery, useUpdateCourseMutation, useGetCoursesByCategoryIdQuery, useGetCoursesByLecturerIdQuery, useCreateCourseMutation, useSearchCoursesQuery  } =
  courseRTKApi;
