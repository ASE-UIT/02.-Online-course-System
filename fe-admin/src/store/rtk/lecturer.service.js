import { baseApi } from "./base.service";
import { showToast } from "./toast";

export const lecturerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLecturer: build.mutation({
      query: (newLecturer) => ({
        url: `/employee/createlecturer`,
        method: "POST",
        body: newLecturer,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showToast("Lecturer created successfully", "success");
        } catch (error) {
          showToast("Failed to create lecturer", "error");
        }
      },
    }),
    updateLecturer: build.mutation({
      query: (updatedLecturer) => ({
        url: `/employee/updateLecturer`,
        method: "PUT",
        body: updatedLecturer,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showToast("Lecturer updated successfully", "success");
        } catch (error) {
          showToast("Failed to update lecturer", "error");
        }
      },
    }),
  }),
});

export const { useCreateLecturerMutation, useUpdateLecturerMutation } = lecturerApi;
