import api from "./apiConfig";

export const getAllLecturers = async (rpp, page) => {
  try {
    const res = await api.get(`/lecturer/paging?rpp=${rpp}&page=${page}`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};

export const approveLecturer = async (lecturerId) => {
  try {
    const res = await api.put(`/lecturer/approve/${lecturerId}`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};
