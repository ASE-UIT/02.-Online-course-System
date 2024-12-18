import api from "./apiConfig";
const TOKEN = JSON.parse(localStorage.getItem("adminToken")) || "";
export const getAllEmployee = async (rpp, page) => {
  try {
    const res = await api.get(`/employee/paging?rpp=${rpp}&page=${page}`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};
export const createEmployee = async (employeeData) => {
  try {
    const res = await api.post(`/employee/create`, employeeData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN.token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const res = await api.put(`/employee/${employeeId}`, employeeData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN.token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    throw error;
  }
};
