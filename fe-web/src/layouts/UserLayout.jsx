import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";

const UserLayout = () => {
  return (
    <div className="font-worksans mt-[285px] md:mt-[65px] w-full">
      <Header />
      <div className="w-full h-full overflow-x-hidden">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default UserLayout;
