import { baseApi } from "./base.services";
import { showToast } from "./toast";

export const courseRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourseProgress: build.query({
      query: (courseId) => ({
        url: `/student-complete-lesson/${courseId}`,
      }),
      providesTags: ["Progress"],
    }),
    getCourseProgress2: build.query({
      query: (courseId) => ({
        url: `/student-complete-lesson/${courseId}`,
      }),
    }),
    getCourses: build.query({
      query: (body) => ({
        url: `/course/paging?rpp=${body.limit}&page${body.page}`,
      }),
    }),
    updateLessonProgress: build.mutation({
      query: (payload) => {
        return {
          url: `/student-complete-lesson/update-progress`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Progress"],
    }),
    getCourseById: build.query({
      query: (courseId) => ({
        url: `course/${courseId}`,
      }),
      providesTags: (result, error, courseId) => [{ type: "Course", id: courseId }],
    }),
    getQuizDoneByCourseId: build.query({
      query: (courseId) => ({
        url: `quiz/done-by-course/${courseId}`,
      }),
    }),
    answerQuiz: build.mutation({
      query: (payload) => ({
        url: `quiz/answer`,
        body: payload,
        method: "POST",
      }),
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
          showToast({
            type: "success",
            msg: "Cập nhật khóa học thành công",
            desc: "Khóa học đã được cập nhật",
          });
        } catch (error) {
          console.log(error);
          showToast({
            type: "error",
            msg: "Cập nhật khóa học thất bại",
            desc: "Lỗi không xác định",
          });
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
      query: (payload) => {
        console.log("Payload being sent:", payload);
        return {
          url: `/course`,
          method: "POST",
          body: payload,
        };
      },
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

        return { url: fullUrl, method: "GET" };
      },
      providesTags: (result, error, { filter, sort, rpp, page }) => [
        {
          type: "SearchResults",
          id: `${JSON.stringify(filter)}-${JSON.stringify(sort)}-${rpp}-${page}`,
        },
      ],
    }),
  }),
});
export const {
  useGetCoursesQuery,
  useGetCourseProgressQuery,
  useGetCourseProgress2Query,
  useGetCourseByIdQuery,
  useGetCategoriesQuery,
  useGetCoursesByCategoryIdQuery,
  useGetCoursesByLecturerIdQuery,
  useSearchCoursesQuery,
  useGetQuizDoneByCourseIdQuery,

  useUpdateCourseMutation,
  useCreateCourseMutation,
  useAnswerQuizMutation,
  useUpdateLessonProgressMutation,
} = courseRTKApi;
