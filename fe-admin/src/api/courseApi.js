import api from "./apiConfig";

const TOKEN = JSON.parse(localStorage.getItem("adminToken")) || "";

export const getWaitingCourseWithPage = async (rpp, page) => {
  try {
    const res = await api.get(
      `/course/waiting-for-approve/paging?rpp=${rpp}&page=${page}`,
      {},
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};

export const approveCourse = async (courseId) => {
  try {
    const res = await api.put(
      `/course/approve/${courseId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json"
        },
        authorization: `Bearer ${TOKEN.token}`
      }
    );
    return res;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const res = await api.get(`/course-category/`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};

export const getAllCategoriesWithPage = async (rpp, page) => {
  try {
    const res = await api.get(
      `/course-category/paging?rpp=${rpp}&page=${page}`,
      {},
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const res = await api.delete(`/course-category/delete/${categoryId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};
