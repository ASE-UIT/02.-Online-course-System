import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  return (
    <div className="font-worksans mt-[285px] md:mt-[65px] w-full">
      <Header />
      <div className="w-full h-full overflow-x-hidden">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLayout;
