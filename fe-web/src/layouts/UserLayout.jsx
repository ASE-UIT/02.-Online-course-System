import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <div className=" w-full font-body overflow-x-hidden">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLayout;
