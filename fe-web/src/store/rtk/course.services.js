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
      query: ({ filter, sort, rpp = 10, page = 1 }) => {
        const body = {
          min_score: 0.5,
          query: {
            bool: {
              must: filter || [],
            },
          },
          sort: [{ [sort.key]: { order: sort.type.toLowerCase() } }],
          from: (page - 1) * rpp,
          size: rpp,
        };

        // console.log("Request Body:", JSON.stringify(body, null, 2));

        return {
          url: "https://eduhub.io.vn/eduhub-search/courses/_search?filter_path=hits.hits._source,hits.total",
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    // searchBox: build.query({
    //   query: ({ filter, sort, rpp, page }) => {
    //     const params = {
    //       filter: JSON.stringify(filter),
    //       sort: JSON.stringify(sort),
    //       rpp,
    //       page,
    //     };
    //     const fullUrl = `course/search?${new URLSearchParams(params).toString()}`;

    //     return { url: fullUrl, method: "GET" };
    //   },
    //   providesTags: (result, error, { filter, sort, rpp, page }) => [
    //     {
    //       type: "SearchResults",
    //       id: `${JSON.stringify(filter)}-${JSON.stringify(sort)}-${rpp}-${page}`,
    //     },
    //   ],
    // }),

    createRating: build.mutation({
      query: (payload) => ({
        url: `/rating`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { courseId }) => [{ type: "Rating", id: courseId }],
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast({
            type: "success",
            msg: "Đánh giá đã được gửi thành công",
            desc: "Cảm ơn bạn đã đánh giá khóa học!",
          });
        } catch (error) {
          showToast({
            type: "error",
            msg: "Gửi đánh giá thất bại",
            desc: "Vui lòng thử lại.",
          });
        }
      },
    }),
    getRatingStatistics: build.query({
      query: (courseId) => ({
        url: `/rating/statistics/${courseId}`,
      }),
      providesTags: (result, error, courseId) => [{ type: "Rating", id: courseId }],
    }),
    updateRating: build.mutation({
      query: ({ id, payload }) => ({
        url: `/rating/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { courseId }) => [{ type: "Rating", id: courseId }],
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          // Check for a successful response (you can also inspect `response` if needed)
          if (response?.data?.success) {
            showToast({
              type: "success",
              msg: "Cập nhật đánh giá thành công",
              desc: "Đánh giá của bạn đã được cập nhật.",
            });
          } else {
            showToast({
              type: "error",
              msg: "Cập nhật đánh giá thất bại",
              desc: "Vui lòng thử lại.",
            });
          }
        } catch {
          showToast({
            type: "error",
            msg: "Cập nhật đánh giá thất bại",
            desc: "Vui lòng thử lại.",
          });
        }
      },
    }),
    searchRating: build.query({
      query: ({ courseId, sort }) => {
        const sortParam = JSON.stringify(sort);
        return {
          url: `/rating/`,
          params: {
            sort: sortParam,
            courseId,
          },
        };
      },
      providesTags: (result, error, { courseId }) => [{ type: "Rating", id: courseId }],
    }),
    getCourseRecommendation: build.query({
      query: (topN) => ({
        url: `/course-recommendation?topN=${topN}`,
        method: "GET",
      }),
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
  // useSearchBoxQuery,
  useGetQuizDoneByCourseIdQuery,

  useUpdateCourseMutation,
  useCreateCourseMutation,
  useAnswerQuizMutation,
  useUpdateLessonProgressMutation,

  useSearchRatingQuery,
  useCreateRatingMutation,
  useGetRatingStatisticsQuery,
  useUpdateRatingMutation,

  useGetCourseRecommendationQuery,
} = courseRTKApi;
