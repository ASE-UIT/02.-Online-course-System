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


export const courseCartApi ={
  getMyCart: async () => {
    try{
      const token = JSON.parse(localStorage.getItem("auth"));
      const config ={
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const response = await api.get(`/cart/me`,config);
      return response.data;
    }catch(error){
      console.log(error);
    }
  }
}