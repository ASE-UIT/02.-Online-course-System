import { useEffect, useState } from "react";
import Header from "./components/Header";
import TrackList from "./components/TrackList";
import VideoViewer from "./components/VideoViewer";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/store/rtk/course.services";
import { useDispatch, useSelector } from "react-redux";
import { setLearning } from "@/store/slices/learningSlice";
import LessonInfo from "./LessonInfo/LessonInfo";

export default function LearningPage() {
  const { moduleSlt, lessonSlt } = useSelector((state) => state.learning);
  const dispatch = useDispatch();
  const [showTrackList, setShowTrackList] = useState(true);
  const { courseId } = useParams();
  const { data: courseResponse } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });
  const course = courseResponse?.data ? courseResponse.data : null;

  useEffect(() => {
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
        })
      );
    }
  }, [course]);

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
