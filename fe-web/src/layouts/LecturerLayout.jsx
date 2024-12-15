import { lecturerGetProfile } from "@/api/profileApi";
import { addLecturerInfor } from "@/store/slices/lecturerInforSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const LecturerLayout = () => {
  const dispatch = useDispatch();
  const { authLecturer } = useSelector((state) => state);

  useEffect(() => {
    document.title = "Eduhub | Lecturer";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getLecturerInfor() {
      try {
        if (authLecturer && authLecturer?.authLecturer.length > 0) {
          const response = await lecturerGetProfile(authLecturer.authLecturer);
          dispatch(addLecturerInfor(response?.data));
        }
      } catch (error) {
        console.log("getLecturerInfor error", error);
      }
    }
    getLecturerInfor();
  }, [authLecturer, dispatch]);

  return <Outlet />;
};

export default LecturerLayout;
