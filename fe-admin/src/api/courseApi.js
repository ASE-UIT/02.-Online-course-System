import api from "./apiConfig";

export const getWaitingCourseWithPage = async (rpp, page) => {
  try {
    const res = await api.get(
      `/course/waiting-for-approve/paging`,
      {},
      {
        params: {
          rpp,
          page
        },
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
