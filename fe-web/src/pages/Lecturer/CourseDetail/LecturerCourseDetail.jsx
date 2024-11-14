import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import CourseInfo from "./CourseInfo/CourseInfo";
import ModuleLesson from "./Module/ModuleLesson";
import PriceInfo from "./PriceInfo/PriceInfo";
import TargetInfo from "./TargetInfo/TargetInfo";
import Introduction from "./Introduction/Introduction";
import Addition from "./Addition/Addition";

export default function LecturerCourseDetail() {
  const location = useLocation();
  const hash = location.hash;

  return (
    <div className="px-16 flex gap-8">
      <div className="">
        <SideBar />
      </div>
      <div className=" flex-1">
        {hash === "" && <CourseInfo />}
        {hash === "#price" && <PriceInfo />}
        {hash === "#target" && <TargetInfo />}
        {hash === "#lesson" && <ModuleLesson />}
        {hash === "#img&video" && <Introduction />}
        {hash === "#doc&gift" && <Addition />}
      </div>
    </div>
  );
}
