import api from "./apiConfig";

export const studentChangePassword = async (currentPassword, newPassword) => {
  const token = JSON.parse(localStorage.getItem("auth"));
  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.put(
    "/student/change-password",
    {
      currentPassword,
      newPassword
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }
  );

  return res.data;
};

export const studentDeleteAccount = async () => {
  const token = JSON.parse(localStorage.getItem("auth"));
  if (!token) {
    throw new Error("No token found");
  }

  const res = await api.delete("/student/delete-my-account", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });

  return res.data;
};
