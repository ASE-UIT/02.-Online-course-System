import { useEffect, useState } from "react";
import Header from "./components/Header";
import TrackList from "./components/TrackList";
import VideoViewer from "./components/VideoViewer";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCourseByIdQuery, useGetCourseProgressQuery } from "@/store/rtk/course.services";
import { useDispatch, useSelector } from "react-redux";
import { setLearning } from "@/store/slices/learningSlice";
import LessonInfo from "./LessonInfo/LessonInfo";
import { isValidNumber } from "@/utils/getLengthVideo";

export default function LearningPage() {
  const { moduleSlt, lessonSlt } = useSelector((state) => state.learning);
  const dispatch = useDispatch();
  const [showTrackList, setShowTrackList] = useState(true);
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const moduleIdx = searchParams.get("moduleIdx");
  const lessonIdx = searchParams.get("lessonIdx");
  const { data: courseResponse } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });
  const { data: learningProgressResponse } = useGetCourseProgressQuery(courseId, {
    skip: !courseId,
  });
  const course = courseResponse?.data ? courseResponse.data : null;

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
    if (learningProgressResponse?.data) {
      dispatch(
        setLearning({
          learnProgress: learningProgressResponse?.data?.lessonLearnProgresses || [],
        })
      );
    }
  }, [course, moduleIdx, lessonIdx, learningProgressResponse]);

  return (
    <div>
      <Header />
      <div className="flex mt-[60px] ">
        <div className="flex-1">
          <VideoViewer />
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
