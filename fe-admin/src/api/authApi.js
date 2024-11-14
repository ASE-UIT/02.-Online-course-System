import api from "./apiConfig";

export const employeeLogin = async (phoneNumberOrEmail, password) => {
  const res = await api.post("/employee/login", {
    phoneNumberOrEmail,
    password
  });
  return res;
};
