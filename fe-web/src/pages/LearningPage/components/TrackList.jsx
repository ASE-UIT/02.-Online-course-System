import { X } from "lucide-react";
import LessonParts from "./LessonParts";

export default function TrackList({ course, onClose }) {
  const modules = course?.lessonParts || [];
  return (
    <div className="">
      <div className="flex p-[20px]  justify-between items-center border-b-[1px] border-gray-500  ">
        <p className="text-text/lg/semibold">Nội dung khoá học</p>
        <X onClick={() => onClose()} className="cursor-pointer w-[24px] h-[24px]" />
      </div>
      {modules.map((module, idx) => {
        return <LessonParts key={idx} module={module} moduleIdx={idx}></LessonParts>;
      })}
    </div>
  );
}
