import api from "./apiConfig";

export const studentRegisterEmail = async (name, email, password) => {
  const res = await api.post("student/register-email", {
    name,
    email,
    password
  });
  return res;
};

export const studentRegisterPhone = async (name, phoneNumber, password) => {
  const res = await api.post("student/register-phone", {
    name,
    phoneNumber,
    password
  });
  return res;
};

export const studentVerifyEmail = async (email, code) => {
  const res = await api.post("student/activate-email", {
    email,
    code
  });
  return res;
};

export const studentVerifyPhone = async (phoneNumber, code) => {
  const res = await api.post("student/activate-phone", {
    phoneNumber,
    code
  });
  return res;
};

export const studentLogin = async (phoneNumberOrEmail, password) => {
  const res = await api.post("/student/login", {
    phoneNumberOrEmail,
    password
  });
  return res;
};
