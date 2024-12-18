import api from "./apiConfig";

export const getWeekStat = async () => {
  try {
    const res = await api.get(`/statistical/week`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    return { error: error.response || error.message };
  }
};
