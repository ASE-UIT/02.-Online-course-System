import { baseApi } from "./base.service";
import { showToast } from "./toast";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: (newEmployee) => {
        console.log("Creating Employee with body:", newEmployee); // Log the request body
        return {
          url: `/employee/create`,
          method: "POST",
          body: newEmployee,
        };
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showToast("Employee created successfully", "success");
        } catch {
          showToast("Failed to create employee", "error");
        }
      },
    }),
    updateEmployee: build.mutation({
      query: (updatedEmployee) => ({
        url: `/employee/${updatedEmployee.employeeId}`,
        method: "PUT",
        body: updatedEmployee,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showToast("Employee updated successfully", "success");
        } catch {
          showToast("Failed to update employee", "error");
        }
      },
    }),
    fetchRoles: build.query({
      query: () => ({
        url: `/role`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateEmployeeMutation, useUpdateEmployeeMutation, useFetchRolesQuery } = employeeApi;
