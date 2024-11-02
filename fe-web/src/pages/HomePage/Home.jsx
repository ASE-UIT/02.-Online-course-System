import CategoryCard from "@/components/Category/CategoryCard";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HomeIcon } from "@/assets";

import { useEffect, useState } from "react";
import { courseApi } from "@/api/courseApi";
import CourseCardIcon from "/picture/CourseCardIcon.svg";
const Home = () => {
  const [liveCourses, setLiveCourses] = useState([]);
  const getLiveCourses = async () => {
    const response = await courseApi.getLiveCourses();
    if (response?.success) {
      setLiveCourses(response.data);
    }
  };
  useEffect(() => {
    getLiveCourses();
  }, []);
  return (
    <div>
      <div className="w-full flex h-[400px] bg-primary-color px-24">
        <div className="basis-[40%]">
          <div className="w-[223px] h-[307px] bg-contain mx-auto mt-8">
            <HomeIcon />
          </div>
        </div>
        <div className="basis-[60%] justify-center gap-8 flex flex-col">
          <header className="text-3xl text-white text-display/md/bold">
            Khám Phá Thế Giới Kiến Thức EduHub – Học Tập Mọi Lúc, Mọi Nơi
          </header>
          <p className=" text-white text-text/md/regular">
            Với EduHub, tri thức nằm trong tầm tay bạn dù bạn ở bất kỳ đâu. Bạn có thể học tập mọi lúc, trên mọi thiết
            bị, tiếp cận khoá học từ các chuyên gia đầu ngành. Không còn giới hạn về thời gian hay không gian, EduHub
            mang lại một phương pháp học tập linh hoạt và hiện đại, giúp bạn chủ động xây dựng hành trình học tập của
            riêng mình.
          </p>
          <div className="text-primary-500 items-center gap-3 flex cursor-pointer transition-all hover:bg-gray-200 text-sm bg-white px-4 py-2 w-fit rounded-[4px] ">
            <p className="text-text/md/semibold">Tham gia ngay</p>
            <ArrowRight className="w-[24px] h-[24px]" />
          </div>
        </div>
      </div>
      <div className="px-24">
        <div className="flex justify-between mt-6">
          <p className=" text-text/lg/bold">Lịch học trực tiếp</p>
          <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {liveCourses.map((course, idx) => {
            return <CourseCard key={idx} course={course}></CourseCard>;
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-text/lg/bold">Top bán chạy</p>
          <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {liveCourses.map((course, idx) => {
            return <CourseCard key={idx} course={course}></CourseCard>;
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-text/lg/bold">Khóa học mới ra mắt</p>
          <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {liveCourses.map((course, idx) => {
            return <CourseCard key={idx} course={course}></CourseCard>;
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-text/lg/bold">
            Khám phá <span className="text-primary-500">EduHub</span>
          </p>
        </div>
        <div className="grid grid-cols-3 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CategoryCard
                category={"Tiếng Anh"}
                subcategory={["Speaking"]}
                img={CourseCardIcon}
                key={idx}
              ></CategoryCard>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center">
          <Button className="text-text/md/semibold text-white">Xem tất cả</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
