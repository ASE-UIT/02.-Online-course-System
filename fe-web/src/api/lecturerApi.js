import api from "./apiConfig";

export const registerLecturer = async (
  name,
  email,
  phoneNumber,
  address,
  bio,
  password,
  exampleVideo,
  socialLink,
  teachingTopic,
  teachingExperience
) => {
  const res = await api.post("/lecturer/register", {
    name,
    email,
    phoneNumber,
    address,
    bio,
    password,
    exampleVideo,
    socialLink,
    teachingTopic,
    teachingExperience
  });
  return res.data;
};

export const verifyLecturer = async (phoneNumber, code) => {
  const res = await api.get(
    `/lecturer/activation/phone?phoneNumber=${phoneNumber}&code=${code}`
  );
  return res;
};

export const loginLecturer = async (phoneNumberOrEmail, password) => {
  const res = await api.post("/lecturer/login", {
    phoneNumberOrEmail,
    password
  });
  return res;
};
