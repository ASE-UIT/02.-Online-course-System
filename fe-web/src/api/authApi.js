import api from "./apiConfig";

export const loginLecturer = async (phoneNumberOrEmail, password) => {
  const res = await api.post("/auth/login", { phoneNumberOrEmail, password });
  return res.data;
};
