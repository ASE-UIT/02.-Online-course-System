import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import CourseInfo from "./CourseInfo/CourseInfo";
import Lesson from "./Lesson/Lesson";

export default function LecturerCourseDetail() {
  const location = useLocation();
  const hash = location.hash;

  return (
    <div className="px-16 flex">
      <div className="">
        <SideBar />
      </div>
      <div className="">
        {hash === "" && <CourseInfo />}
        {hash === "#lesson" && <Lesson />}
      </div>
    </div>
  );
}
