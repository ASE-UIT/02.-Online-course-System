import api from "./apiConfig";

export const studentGetProfile = async (token) => {
  if (!token) {
    throw new Error("No token found");
  }
  token = token.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
  try {
    const res = await api.get("/student/me", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching student profile:",
      error.response || error.message
    );
    throw error;
  }
};

export const studentGetProfileNotAuth = async () => {
  let token = JSON.parse(localStorage.getItem("auth"));
  if (!token) {
    throw new Error("No token found");
  }
  token = token.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
  try {
    const res = await api.get("/student/me", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching student profile:",
      error.response || error.message
    );
    throw error;
  }
};

export const studentUpdateProfile = async (name, avatar, birthday, address) => {
  const token = JSON.parse(localStorage.getItem("auth"));
  if (!token) {
    throw new Error("No token found");
  }
  // token = token.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
  try {
    const res = await api.put(
      "/student/update-my-profile",
      {
        name,
        avatar,
        birthday,
        address
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error updating student profile:",
      error.response || error.message
    );
    throw error;
  }
};

export const lecturerGetProfile = async (token) => {
  if (!token) {
    throw new Error("No token found");
  }
  token = token.replace(/^"|"$/g, ""); // Remove surrounding quotes if any
  try {
    const res = await api.get("/lecturer/me", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching lecturer profile:",
      error.response || error.message
    );
    throw error;
  }
};
