import api from "./apiConfig";
import error from "eslint-plugin-react/lib/util/error.js";
import cartPage from "@/pages/CartPage/CartPage.jsx";

export const courseApi = {
  getLiveCourses: async () => {
    try {
      const response = await api.get(`/course/live/${8}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  createCourse: async (courseData) => {
    try {
      const token = JSON.parse(localStorage.getItem("authLecturer")); // Retrieve the token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the Bearer token for authentication
          "Content-Type": "application/json", // Specify content type as JSON
        },
      };

      const response = await api.post("/course", courseData, config); // Sending POST request with course data
      return response.data; // Return response data after course is created
    } catch (error) {
      console.log("Error creating course:", error);
      return { error: error.message }; // Return error message if any error occurs
    }
  },
  getMyStudentCourses: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(`/enrollment/me`, config);
      return response.data;
    } catch (e) {
      console.log(e);
      return { error: e.message };
    }
  },
};

export const courseCartApi = {
  getMyCart: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/cart/me`, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  removeFromCart: async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.delete(`/cart/remove/${id}`, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  createOrder: async (orderData) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post("/order/create-order", orderData, config);
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  },
  getOrder: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/order/get-order`, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getMyProfile: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get("/student/me", config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  addToCart: async (courseId) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(`/cart/add`, courseId, config);
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  },
};
