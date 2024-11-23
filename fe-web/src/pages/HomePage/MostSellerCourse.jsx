import { CourseCard } from "@/components/Courses/CourseCard";
import { useGetCoursesQuery } from "@/store/rtk/course.services";

export default function MostSellerCourse() {
  const { data: courseResponse } = useGetCoursesQuery({
    limit: 8,
    page: 1,
  });
  const courses = courseResponse?.data?.items ? courseResponse.data.items : [];

  return (
    <>
      <div className="flex justify-between mt-6">
        <p className="text-text/lg/bold">Top bán chạy</p>
        <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
      </div>
      <div className="grid grid-cols-4 mt-4  gap-[1rem]">
        {courses.map((course, idx) => {
          return <CourseCard key={idx} course={course}></CourseCard>;
        })}
      </div>
    </>
  );
}
