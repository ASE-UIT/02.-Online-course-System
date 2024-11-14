import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

const DefaultLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default DefaultLayout;
