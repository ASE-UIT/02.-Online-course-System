import React from "react";
import { CirclePlay } from "lucide-react";

const CourseLessonPart = ({ lesson }) => {
  return (
    <div
      className="flex items-center px-5 py-3 justify-between gap-[10px] border-b border-black-50
      hover:shadow-md hover:cursor-pointer"
    >
      <div className="content-name flex gap-[10px]">
        <div className="icon w-[24px] h-[24px]">
          <CirclePlay className="fill-error-500 text-white" />
        </div>
        <h3 className="text-text/md/medium">{lesson?.title}</h3>
      </div>
      <div className="left-info flex gap-[10px]">
        {lesson?.isFreeTrial && Array.isArray(lesson.resourceLink) && lesson.order > 0 && lesson.order <= lesson.resourceLink.length && (
          <a
            href={lesson.resourceLink[lesson.order - 1]} // Ensure valid access
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 text-text/md/medium"
          >
            Học thử
          </a>
        )}
        <span className="text-text/md/regular">
          {(() => {
            const totalHours = lesson?.duration ?? 0; // Default to 0 if duration is undefined
            const hours = Math.floor(totalHours); // Full hours part
            const minutes = Math.floor((totalHours - hours) * 60); // Remaining minutes
            const seconds = 0; // Fixed to 00 seconds
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          })()}
        </span>
      </div>
    </div>
  );
};

export default CourseLessonPart;
