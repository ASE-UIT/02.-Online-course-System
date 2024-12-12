import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/store/rtk/course.services";
import CourseLessonPart from "@/components/Courses/CourseDetail/CourseLessonPart";

function CourseContent() {
  const [expandedSection, setExpandedSection] = useState(null);
  const params = useParams();
  const { data: courseResponse } = useGetCourseByIdQuery(params?.id);
  const course = courseResponse?.data || null;
  const lessonParts = course?.lessonParts || [];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-white rounded-md">
      <div className="title w-1/3">
        <header className="bg-error-100 text-error-700 text-center leading-[48px] text-text/lg/semibold w-[240px] h-[48px] rounded-br-[4px] inline-block hover:shadow-md hover:cursor-pointer">
          Nội dung khóa học
        </header>
      </div>

      <div className="content p-5 gap-5 flex flex-col">
        <p className="text-text/md/regular">
          {`${lessonParts?.length} phần - ${lessonParts?.reduce(
            (acc, part) => acc + part?.lessons?.length,
            0
          )} bài giảng - ${(() => {
            const totalMinutes =
              lessonParts.reduce(
                (acc, part) =>
                  acc + part.lessons.reduce((lessonAcc, lesson) => lessonAcc + parseFloat(lesson?.duration), 0),
                0
              ) * 60; // convert hours to minutes

            const hours = Math.floor(totalMinutes / 60); // get the number of hours
            const minutes = Math.round(totalMinutes % 60); // get the remaining minutes

            return `${hours} giờ ${minutes.toString().padStart(2, "0")} phút`; // format output
          })()}
        `}
        </p>

        <div className="flex flex-col gap-[8px]">
          {lessonParts.map((part) => (
            <div key={part?.id} className="flex flex-col">
              {/* Section Header */}
              <div
                className="flex items-center justify-between gap-[10px] py-3 px-5 rounded-[4px] bg-gray-300 hover:shadow-md hover:cursor-pointer"
                onClick={() => toggleSection(part?.id)}
              >
                <div className="content-name flex gap-[10px] w-2/3">
                  {expandedSection === part?.id ? (
                    <Minus className="text-error-300" />
                  ) : (
                    <Plus className="text-error-300" />
                  )}
                  <h3 className="text-text/md/medium">{`Phần ${part?.partNo}: ${part?.partName}`}</h3>
                </div>
                <span className="text-text/md/regular w-1/3 text-right">{`${part?.lessons?.length} bài giảng`}</span>
              </div>

              {/* Section Lessons */}
              {expandedSection === part?.id && (
                <div className="inside-content rounded-[4px] flex flex-col gap-3">
                  {part?.lessons.map((lesson) => (
                    <CourseLessonPart key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
