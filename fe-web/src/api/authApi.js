import api from "./apiConfig";

export const loginLecturer = async (phoneNumberOrEmail, password) => {
  const res = await api.post("/auth/login", { phoneNumberOrEmail, password });
  return res;
};

export const studentRegister = async (name, email, password) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res;
};

export const studentLogin = async (phoneNumberOrEmail, password) => {
  const res = await api.post("/student/login", {
    phoneNumberOrEmail,
    password
  });
  return res;
};
