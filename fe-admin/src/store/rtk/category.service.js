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
    updateCategory: build.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `/course-category/${id}/`,
        method: "PUT",
        body: updatedCategory,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showToast("Category updated successfully", "success");
        } catch {
          showToast("Failed to update category", "error");
        }
      },
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/course-category/${id}/`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showToast("Category deleted successfully", "success");
        } catch {
          showToast("Failed to delete category", "error");
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
