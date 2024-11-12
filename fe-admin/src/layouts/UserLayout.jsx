import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { NavigationProvider } from "../context/NavigationContext";

const UserLayout = () => {
  return (
    <div className="-z-10">
      <NavigationProvider>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />

          <div className="z-10 flex-1 p-5">
            <Header />
            <main className="z-30 py-5 w-full h-[calc(100vh-104px)] overflow-y-auto overflow-x-auto">
              <div className="p-5 bg-white border-2 border-[rgba(0,0,0,0.07)] rounded-xl shadow-[0px_8px_15.9px_0px_rgba(0,0,0,0.07)] w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
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
