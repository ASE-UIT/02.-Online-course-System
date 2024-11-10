import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { NavigationProvider } from "../context/NavigationContext";

const UserLayout = () => {
  return (
    <div>
      <NavigationProvider>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />

          <div className="flex-1">
            <Header />
            <main className="p-6">
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </NavigationProvider>
      <ToastContainer />
    </div>
  );
};

export default UserLayout;
