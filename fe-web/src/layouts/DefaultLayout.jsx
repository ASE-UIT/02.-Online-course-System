import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
