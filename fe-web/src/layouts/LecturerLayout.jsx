import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const LecturerLayout = () => {
  useEffect(() => {
    document.title = "Eduhub | Lecturer";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Outlet />;
};

export default LecturerLayout;
