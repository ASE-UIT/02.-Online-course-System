import api from "./apiConfig";

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
      const token = JSON.parse(localStorage.getItem("auth")); // Retrieve the token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the Bearer token for authentication
          'Content-Type': 'application/json', // Specify content type as JSON
        }
      };
      
      const response = await api.post('/course', courseData, config); // Sending POST request with course data
      return response.data; // Return response data after course is created
    } catch (error) {
      console.log("Error creating course:", error);
      return { error: error.message }; // Return error message if any error occurs
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
      return {error: error.message};
    }
  }
}

