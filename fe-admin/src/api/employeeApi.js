import api from "./apiConfig";

export const getAllEmployee = async (rpp, page) => {
  try {
    const res = await api.get(`/employee/paging?rpp=${rpp}&page=${page}`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};
