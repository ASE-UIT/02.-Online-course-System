import LecturerNav from "./LecturerNav";
import { CourseContent } from "./CourseContent";

const TeacherCoursePage = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <LecturerNav />
      <CourseContent />
    </div>
  );
};

export default TeacherCoursePage;
