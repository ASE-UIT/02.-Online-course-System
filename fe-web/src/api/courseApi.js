import api from "./apiConfig";

export const courseApi = {
  getLiveCourses: async () => {
    try {
      const response = await api.get(`/course/live/${8}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
