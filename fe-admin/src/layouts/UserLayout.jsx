import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { NavigationProvider } from "@/context/NavigationContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

const UserLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.title =
      "Admin | " +
      location.pathname.split("/")[location.pathname.split("/").length - 1];
  }, [location]);

  return (
    <div className="-z-10 font-worksans">
      <NavigationProvider>
        <div className="flex h-screen bg-gray-50">
          <div className="z-10 flex-1 bg-gray-50">
            <Header />
            <Sidebar />
            <main className="z-30 p-5 bg-gray-50">
              <Outlet />
            </main>
          </div>
        </div>
      </NavigationProvider>
      <Toaster />
    </div>
  );
};

export default UserLayout;
