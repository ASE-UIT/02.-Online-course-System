import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { NavigationProvider } from "@/context/NavigationContext";
import Sidebar from "@/components/Sidebar/Sidebar";

const UserLayout = () => {
  return (
    <div className="-z-10 font-worksans">
      <NavigationProvider>
        <div className="flex h-screen bg-gray-50">
          <div className="z-10 flex-1">
            <Header />
            <Sidebar />
            {/* <main className="z-30 py-5 w-full h-[calc(100vh-167px)]">
              <div className="p-5 bg-white rounded-xl shadow-[0px_8px_15.9px_0px_rgba(0,0,0,0.07)] w-full h-full overflow-x-hidden">
                <Outlet />
              </div>
            </main> */}
            <main className="z-30 p-5 bg-gray-300">
              <Outlet />
            </main>
          </div>
        </div>
      </NavigationProvider>
    </div>
  );
};

export default UserLayout;
