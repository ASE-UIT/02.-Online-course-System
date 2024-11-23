import { useLocation, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import CourseInfo from "./CourseInfo/CourseInfo";
import ModuleLesson from "./Module/ModuleLesson";
import PriceInfo from "./PriceInfo/PriceInfo";
import TargetInfo from "./TargetInfo/TargetInfo";
import Introduction from "./Introduction/Introduction";
import Addition from "./Addition/Addition";
import { useGetCourseByIdQuery } from "@/store/rtk/course.services";

export default function LecturerCourseDetail() {
  const location = useLocation();
  const hash = location.hash;
  const { id } = useParams();
  const { data: courseResponse } = useGetCourseByIdQuery(id, {
    skip: !id,
  });
  const course = courseResponse?.data ? courseResponse.data : null;

  return (
    <div className="px-16 flex gap-8">
      <div className="">
        <SideBar />
      </div>
      {course && (
        <div className=" flex-1">
          {hash === "" && <CourseInfo course={course} />}
          {hash === "#price" && <PriceInfo course={course} />}
          {hash === "#target" && <TargetInfo />}
          {hash === "#lesson" && <ModuleLesson />}
          {hash === "#img&video" && <Introduction />}
          {hash === "#doc&gift" && <Addition />}
        </div>
      )}
    </div>
  );
}
