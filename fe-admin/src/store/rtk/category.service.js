import { baseApi } from "./base.service";
import { showToast } from "./toast";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: `/course-category/`,
      }),
    }),
    createCategory: build.mutation({
      query: (newCategory) => ({
        url: `/course-category/`,
        method: "POST",
        body: newCategory,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showToast("Category created successfully", "success");
        } catch {
          showToast("Failed to create category", "error");
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;
