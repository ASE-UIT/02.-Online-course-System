import { useEffect, useState } from "react";
import Header from "./components/Header";
import TrackList from "./components/TrackList";
import VideoViewer from "./components/VideoViewer";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useGetCourseByIdQuery,
  useGetCourseProgressQuery,
  useGetCourseProgress2Query,
} from "@/store/rtk/course.services";
import { useDispatch, useSelector } from "react-redux";
import { setLearning } from "@/store/slices/learningSlice";
import LessonInfo from "./LessonInfo/LessonInfo";
import { isValidNumber } from "@/utils/getLengthVideo";

export default function LearningPage() {
  const { moduleSlt, lessonSlt, lesson } = useSelector((state) => state.learning);
  const dispatch = useDispatch();
  const [showTrackList, setShowTrackList] = useState(true);
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const [progressBase, setProgressBase] = useState(0);
  const moduleIdx = searchParams.get("moduleIdx");
  const lessonIdx = searchParams.get("lessonIdx");
  const { data: courseResponse } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });
  const { data: learningProgressResponse } = useGetCourseProgressQuery(courseId, {
    skip: !courseId,
    // pollingInterval:10000
  });
  const { data: baseLearningProgressRes, refetch } = useGetCourseProgress2Query(courseId, {
    skip: !courseId,
    // pollingInterval:10000
  });
  const course = courseResponse?.data ? courseResponse.data : null;
  const handleGetProgress = (learnProgress, lessonId) => {
    if (!learnProgress || !learnProgress.lessonLearnProgresses) {
      return 0; // Return 0 if data is invalid
    }

    // Find the specific lesson progress based on lessonId
    const lesson = learnProgress.lessonLearnProgresses.find((item) => item.lessonId === lessonId);

    if (!lesson) {
      return 0; // Return 0 if lessonId is not found
    }

    // Return the progress percentage for the lesson
    return lesson.progress || 0;
  };
  useEffect(() => {
    if (isValidNumber(moduleIdx) && isValidNumber(lessonIdx)) {
      const mdIdx = Number(moduleIdx);
      const lsIdx = Number(lessonIdx);
      if (course?.lessonParts && course?.lessonParts[mdIdx]?.lessons && course?.lessonParts[mdIdx]?.lessons[lsIdx]) {
        dispatch(
          setLearning({
            moduleSlt: mdIdx,
            lessonSlt: lsIdx,
            lesson: course?.lessonParts[mdIdx]?.lessons[lsIdx],
            course: course,
          })
        );
        return;
      }
    }
    if (
      course?.lessonParts &&
      course?.lessonParts.length > 0 &&
      course?.lessonParts[0]?.lessons &&
      course?.lessonParts[0]?.lessons.length > 0
    ) {
      dispatch(
        setLearning({
          moduleSlt: 0,
          lessonSlt: 0,
          lesson: course?.lessonParts[0]?.lessons[0],
          course: course,
        })
      );
    }
  }, [course, moduleIdx, lessonIdx, dispatch]);
  useEffect(() => {
    if (learningProgressResponse?.data) {
      dispatch(
        setLearning({
          learnProgress: learningProgressResponse?.data || [],
        })
      );
    }
  }, [dispatch, learningProgressResponse]);
  useEffect(() => {
    if (baseLearningProgressRes?.data && lesson) {
      const res = handleGetProgress(baseLearningProgressRes.data, lesson.id);
      setProgressBase(res / 100);
    }
  }, [baseLearningProgressRes, lesson]);
  useEffect(() => {
    if (moduleIdx !== -1 && lessonIdx !== -1) {
      refetch();
    }
  }, [moduleIdx, lessonIdx, refetch]);
  return (
    <div>
      <Header />
      <div className="flex mt-[60px] ">
        <div className="flex-1">
          <VideoViewer progressBase={progressBase} />
          <LessonInfo />
        </div>
        {showTrackList && (
          <div className="w-[376px]">
            <TrackList
              course={course}
              onClose={() => setShowTrackList(false)}
              moduleSlt={moduleSlt}
              lessonSlt={lessonSlt}
            />
          </div>
        )}
      </div>
    </div>
  );
}
