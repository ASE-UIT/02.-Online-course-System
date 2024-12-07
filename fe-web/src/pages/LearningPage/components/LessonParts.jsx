import { ChevronDown, ChevronUp, FilePenLine } from "lucide-react";
import { useEffect, useState } from "react";
import CircularProgress from "./CircularProgress";
import { convertMinutesToTime } from "@/utils/converter";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
const PlayIcon = ({ className }) => {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L7 5L1 9V1Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default function LessonParts({ module, moduleIdx }) {
  const { moduleSlt, lessonSlt, course } = useSelector((state) => state.learning);
  const [showLessons, setShowLessons] = useState(false);
  const [searchParams] = useSearchParams();
  const showQuiz = searchParams.get("showQuiz") === "1" ? true : false;
  const isRightModule = moduleIdx === moduleSlt ? true : false;
  const navigate = useNavigate();
  const handleShowQuiz = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("showQuiz", "1");
    navigate(`?${searchParams.toString()}`);
  };
  useEffect(() => {
    if (moduleSlt === moduleIdx) setShowLessons(true);
  }, [moduleIdx, moduleSlt]);
  const tmp = course?.lessonParts && (course?.lessonParts[moduleIdx]?.quizzes || []);
  const quizzes = tmp || [];

  return (
    <div>
      <div
        onClick={() => setShowLessons((prev) => !prev)}
        className="flex px-[20px] py-[12px] bg-gray-300 items-center cursor-pointer justify-between gap-2"
      >
        <p className="text-text/md/medium line-clamp-2 break-words">{module?.partName}</p>
        {!showLessons && <ChevronDown className="min-w-[24px] h-[24px] text-black-300" />}
        {showLessons && <ChevronUp className="min-w-[24px] h-[24px] text-black-300" />}
      </div>
      {showLessons && (
        <div className="animate-expand-down">
          {module?.lessons.map((lesson, idx) => (
            <div
              key={idx}
              onClick={() => {
                navigate(`?moduleIdx=${moduleIdx}&lessonIdx=${idx}&showQuiz=0`);
              }}
              className={`${
                !showQuiz && isRightModule && idx === lessonSlt ? "bg-black-100" : "hover:bg-gray-300"
              } px-[20px] py-[12px] flex items-center gap-[10px] cursor-pointer `}
            >
              <div className="min-w-[20px] h-[20px] flex items-center justify-center bg-black-300 rounded-full">
                <PlayIcon className={"ml-[2px]"} />
              </div>
              <div className="text-text/md/medium line-clamp-2 break-words flex-1">{lesson.title}</div>
              <div className="min-w-[50px] text-text/md/regular text-center">
                {convertMinutesToTime(lesson.duration)}
              </div>
              <CircularProgress size={25} strokeWidth={2} percentage={40} />
            </div>
          ))}
          {quizzes.length > 0 && (
            <div
              onClick={() => {
                handleShowQuiz();
              }}
              className={`${
                showQuiz ? "bg-black-100" : "hover:bg-gray-300"
              } px-[20px] py-[12px] flex items-center gap-[10px] cursor-pointer `}
            >
              <div className="min-w-[20px] h-[19px] flex items-center justify-center  rounded-full">
                <FilePenLine className="w-[19px]"/>
              </div>
              <div className="text-text/md/medium line-clamp-2 break-words flex-1">Câu hỏi trắc nghiệm</div>
              <div className="min-w-[50px] text-text/md/regular text-center"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
