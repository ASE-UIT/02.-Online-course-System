import { getNextLesson } from "@/utils/getLengthVideo";
import { AlertCircleIcon, ChevronRight } from "lucide-react";

import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuizView from "./QuizView";
import { useEffect, useRef, useState } from "react";
import { useUpdateLessonProgressMutation } from "@/store/rtk/course.services";

export default function VideoViewer({ progressBase }) {
  const { lesson, course, moduleSlt, lessonSlt } = useSelector((state) => state.learning);
  const navigate = useNavigate();
  const [videoDuration, setVideoDuration] = useState(null);
  const [progressTracking, setProgressTracking] = useState(0);
  const [updateLessonProgress] = useUpdateLessonProgressMutation();
  const [searchParams] = useSearchParams();
  const showQuiz = searchParams.get("showQuiz") === "1" ? true : false;
  const [autoPlay, setAutoPlay] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef(null);
  const playerRef = useRef(null);
  const handleNextVideo = () => {
    const nextVideo = getNextLesson(course, moduleSlt, lessonSlt);
    if (nextVideo) {
      navigate(`?moduleIdx=${nextVideo.moduleIdx}&lessonIdx=${nextVideo.lessonIdx}&showQuiz=0`);
    } else {
      if (course?.lessonParts[moduleSlt]?.quizzes?.length > 0) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("showQuiz", "1");
        navigate(`?${searchParams.toString()}`);
      }
    }
  };
  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };
  const handleReady = () => {
    setIsReady(true);
  };
  const onEndVideo = async () => {
    await updateLessonProgress({
      lessonId: lesson?.id,
      progress: 100,
    });
    if (autoPlay) handleNextVideo();
  };
  const handleProgressUpdate = ({ played }) => {
    const percentage = Math.floor(played * 100);
    if (percentage / 100 <= progressTracking || (percentage >= 90 && percentage <= 100)) return;
    setProgressTracking(percentage / 100);
    // Send progress updates every 10 seconds
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        updateLessonProgress({
          lessonId: lesson?.id,
          progress: percentage,
        });
      }, 15000); // 10 seconds debounce
    }
  };
  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (playerRef?.current && isReady && videoDuration) {
      const seekPosition = progressBase * videoDuration;
      playerRef.current.seekTo(seekPosition, "seconds");
    }
  }, [progressBase, playerRef, isReady, videoDuration, showQuiz]);
  useEffect(() => {
    setProgressTracking(progressBase);
  }, [progressBase]);
  if (!lesson) return <></>;
  return (
    <div className="bg-gray-100">
      <div className="w-full h-[500px]">
        {!showQuiz && (
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            muted={true}
            playing={true}
            style={{ backgroundColor: "#000" }}
            controls={true}
            onDuration={handleDuration}
            onReady={handleReady}
            onProgress={handleProgressUpdate}
            onEnded={() => {
              onEndVideo();
            }}
            url={lesson?.videoUrl || "https://files.vidstack.io/sprite-fight/720p.mp4"}
          />
        )}
        {showQuiz && <QuizView />}
      </div>
      <div className="mt-[20px] flex justify-end gap-[10px] px-[20px]">
        <div className="cursor-pointer hover:bg-gray-600 transition-all flex items-center gap-[8px] px-[8px] py-[6px] bg-gray-500 rounded-[4px]">
          <AlertCircleIcon className="w-[24px] h-[24px]" />
          <p className="text-text/lg/regular">Báo lỗi</p>
        </div>
        <div
          onClick={() => setAutoPlay((prev) => !prev)}
          className="cursor-pointer hover:bg-gray-600 transition-all flex items-center gap-[8px] px-[8px] py-[6px] bg-gray-500 rounded-[4px]"
        >
          <p className="text-text/lg/regular">Tự động phát</p>

          <div
            className={`${
              autoPlay ? "bg-black-400" : "bg-black-200"
            } w-[26px] transition-all flex items-center h-[16px] rounded-full`}
          >
            <div
              className={`w-[8px] transition-all h-[8px] ${
                autoPlay && "translate-x-[10px]"
              } ml-[4px] bg-white rounded-full`}
            ></div>
          </div>
        </div>
        <div
          onClick={() => handleNextVideo()}
          className="cursor-pointer hover:bg-primary-600 transition-all flex items-center gap-[8px] px-[8px] py-[6px] bg-primary-500 text-white rounded-[4px]"
        >
          <p className="text-text/lg/regular">Bài sau</p>
          <ChevronRight className="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  );
}
