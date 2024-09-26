import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  return (
    <div>
      <div className=" w-full overflow-x-hidden">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLayout;
