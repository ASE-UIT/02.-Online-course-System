import checkAuth from "@/api/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const login = (data) => {
    localStorage.setItem("adminToken", JSON.stringify(data));
    setUserInfo(data);
    setIsAuthenticated(true);
    navigate("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setUserInfo(null);
    setIsAuthenticated(false);
    navigate("/admin/sign-in");
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setUserInfo(JSON.parse(localStorage.getItem("adminToken")));
      setIsAuthenticated(true);
    } else {
      setUserInfo(null);
      navigate("/admin/sign-in");
    }
  }, [navigate]);

  const token = checkAuth();
  if (!token) {
    <Navigate to="/admin/sign-in" />;
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        login,
        logout,
        checkLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
