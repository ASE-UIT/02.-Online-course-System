import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { NavigationProvider } from "@/context/NavigationContext";

const UserLayout = () => {
  return (
    <div className="-z-10 font-worksans">
      <NavigationProvider>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />

          <div className="z-10 flex-1 m-5">
            <Header />
            <main className="z-30 py-5 w-full h-[calc(100vh-104px)]">
              <div className="p-5 bg-white rounded-xl shadow-[0px_8px_15.9px_0px_rgba(0,0,0,0.07)] w-full h-full overflow-x-hidden">
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
