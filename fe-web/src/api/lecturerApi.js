import api from "./apiConfig";

export const registerLecturer = async (
  name,
  email,
  phoneNumber,
  address,
  bio,
  password
) => {
  const res = await api.post("/lecturer/register", {
    name,
    email,
    phoneNumber,
    address,
    bio,
    password
  });
  return res.data;
};

export const loginLecturer = async (phoneNumberOrEmail, password) => {
  const res = await api.post("/lecturer/login", {
    phoneNumberOrEmail,
    password
  });
  return res;
};
