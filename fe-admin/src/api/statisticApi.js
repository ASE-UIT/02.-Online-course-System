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

export const getMonthStat = async () => {
  try {
    const res = await api.get(`/statistical/month`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    return { error: error.response || error.message };
  }
};

export const getYearStat = async () => {
  try {
    const res = await api.get(`/statistical/year`);
    return res.data;
  } catch (error) {
    console.error("API call error:", error.response || error.message);
    return { error: error.response || error.message };
  }
};
