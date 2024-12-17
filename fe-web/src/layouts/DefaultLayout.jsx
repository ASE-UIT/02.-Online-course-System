import { studentGetProfile } from "@/api/profileApi";
import { addStudentInfor } from "@/store/slices/studentInforSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getStudentInfor() {
      try {
        if (auth && auth?.length > 0) {
          const response = await studentGetProfile(auth);
          dispatch(addStudentInfor(response?.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getStudentInfor();
  }, [auth, dispatch]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
