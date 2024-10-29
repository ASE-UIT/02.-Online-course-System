import api from "./apiConfig";

export const loginLecturer = async (
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
