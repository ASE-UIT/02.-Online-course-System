import { ArrowDown, ArrowUp, Check } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import CourseInfo from "./CourseInfo";
import LecturerInfo from "./LecturerInfo";
import CourseContent from "./CourseContent";
import { Button } from "@/components/ui/button";
import CourseRating from "@/components/Courses/CourseDetail/CourseRating";
import RelatedCourse from "./RelatedCourse";
import { useState } from "react";
import { useGetCourseByIdQuery } from "@/store/rtk/course.services";
import { useParams } from "react-router-dom";
import Rating from "@/components/Rating/Rating";

export default function CourseDetail() {
  const [showMore, setShowMore] = useState(false);
  const params = useParams();

  const { data: courseResponse } = useGetCourseByIdQuery(params?.id);
  const course = courseResponse?.data || null;
  const courseIntroduction = course?.introduction;

  if (!course) return <></>;
  return (
    <div className="">
      <div
        className="h-[422px] relative bg-no-repeat bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${
            course?.thumbnail ||
            "https://www.shutterstock.com/image-vector/online-education-vector-banner-home-260nw-1821642545.jpg"
          })`,
        }}
      >
        <div className="w-full flex  h-full absolute bg-course-ct px-24  gap-12">
          <div className="flex flex-col basis-[60%] h-full justify-end gap-2 pb-12">
            <header className="text-display/md/bold text-white">{course?.name}</header>
            <p className="text-text/md/regular text-white">{course?.shortDescription}</p>
            <div className="flex items-center gap-4">
              <p className="text-text/md/semibold text-warning-500">{course?.averageRating}</p>
              <div className="flex">
                <Rating
                  rating={course?.averageRating ? course.averageRating : 0}
                  className="text-warning-500 w-[24px] h-[24px]"
                />
              </div>
              <p className="text-text/md/regular text-white">({course?.totalReviews} đánh giá)</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-text/md/regular text-white">Giảng viên:</p>
              <p className="text-text/md/semibold text-warning-500 underline">{course?.lecturer?.name}</p>
            </div>
          </div>
          <div className="basis-[40%]">
            <CourseInfo course={course} />
            <LecturerInfo course={course} />
          </div>
        </div>
      </div>
      <div className="flex px-24 py-[24px] gap-12">
        <div className="basis-[60%] ">
          <div className="border-[4px] border-primary-100 rounded-[12px]">
            <header className="bg-primary-100 text-primary-500 text-center leading-[48px] text-text/lg/semibold w-[240px] h-[48px] rounded-br-[4px] inline-block">
              Bạn sẽ học được
            </header>
            <div className="grid grid-cols-2 gap-8 p-[20px]">
              {course?.courseTargets?.map((target, idx) => {
                return (
                  <div key={idx} className="flex gap-2 items-start">
                    <Check className="min-w-[24px] mt-[2px] min-h-[24px] text-primary-700 " />
                    <p className="max-w-[312px] text-text/md/regular">{target}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={` border-[4px] relative mt-4 border-success-100 rounded-[12px]`}>
            <header className="bg-success-100 text-success-700 text-center leading-[48px] text-text/lg/semibold w-[240px] h-[48px] rounded-br-[4px] inline-block">
              Giới thiệu khóa học
            </header>
            <div
              className={`${showMore ? "h-full " : "max-h-[400px] "} ${
                showMore ? "animate-scrollDown" : "animate-scrollUp"
              } p-[20px] pb-0 overflow-hidden mb-9 text-text/lg/regular`}
              dangerouslySetInnerHTML={{ __html: courseIntroduction }}
            ></div>
            <div
              onClick={() => {
                setShowMore((prev) => !prev);
              }}
              className={`absolute gap-1 flex items-center bottom-[1%] text-success-600 cursor-pointer hover:text-success-700 transition-all px-[20px]`}
            >
              {showMore ? <p>Ẩn bớt</p> : <p>Xem thêm</p>}
              {showMore ? <ArrowUp className="h-[18px] w-[18px]" /> : <ArrowDown className="h-[18px] w-[18px]" />}
            </div>
          </div>
          <div className="border-[4px] mt-4 rounded-[12px] border-red-100">
            <CourseContent />
          </div>
          {/* Banner */}
          <div className=" mt-5 bg-warning-50 flex gap-[50px]">
            <div
              className="image w-[188px] h-[200px] bg-cover mt-[59px] ml-[51px]"
              style={{
                backgroundImage: `url(https://s3-alpha-sig.figma.com/img/fed6/d8cf/aff81f292ae2e9b6876ec63b242587a6?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gD4r5m1bzKtqU1If6c2w1h1XTUKNHYxIOBWZCrYalcN5uts3uxwjSx5mj7L6GCZ~6G9xq5H16dNgoRMSnLMOLolzjPQvN~R9VYQuiHo7z99fwR-Lyc0A2yMGzDw4orO1iSTeLNXPiBDWj4-phi-AjXoHtbMQ1P2-0ofPQCAB~ltuvuRcS19D3oSIplcb4VcryrVKTu0XvbCx6VKd-GxgyVmNPzbLywCH4SkeQRxbgq3rtIbpyLRxURHUoVJVnIrMt~fMfAnE9XNfZ87ejARlNPgCuWIWGh64D9aQ0F5wsnpOrfQPVlfB-pxX8jG8kswhqj7gHtk8LoklRMBrkS09cw__)`,
              }}
            ></div>
            <div className="title flex flex-col justify-between items-end w-[400px] mt-10">
              <h1 className="text-display/md/bold text-warning-700 text-right h-[88px] ">
                Bạn thấy khoá học <br /> hữu ích chứ?
              </h1>
              <div className="button px-4 py-2 relative">
                <div className="lines flex z-1 justify-center py-3 gap-2">
                  <p className="border-b-2 border-primary-500 w-[18.38px] rotate-[45deg]"></p>
                  <p className="border-b-2 border-primary-500 w-[26px] rotate-[90deg] absolute left-1/2 transform -translate-x-1/2 -translate-y-2"></p>
                  <p className="border-b-2 border-primary-500 w-[18.38px] rotate-[135deg]"></p>
                </div>
                <Button className="w-[193px] shadow-box-shadow">Mua ngay</Button>
              </div>
              <div className="z-0 mt-[-20px] flex justify-center w-1/2">
                <div
                  className="image2 w-[53px] h-[119px] bg-cover"
                  style={{
                    backgroundImage: `url(https://s3-alpha-sig.figma.com/img/ba9e/9674/6dce83977bcfaae467870b22a1465891?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LgKYNFdVoMWDLYuirtytGQ5RTntc5eyfb7CSSyveV6hVClJVb-QGppvROloZMOvTILlZhlowaBtOD3CtOV8~6rhm4fNChHnCPQScO3F8JfdSuw2liXLao4Tpru4FxDStWt2b62sXGHTw9kD5n9U-1gCE88KYqHKphFQOuRqaUESei2GNgCPArUIAPeUiImGRBvuABK09jwd2jiIMvBK9lVWnOiq3ItqBOakDFCKuuznop~fWa4e8qutO8nUA3J0bjaDHyUjNBfoIQ~ec~JN3NCZ6deBUS5LaFBORdcDsusJUTCHX0bYnB0zBqCC6On9~N2DNNbA6tPEuwrV1RdWn7Q__)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <p className="border-b border-black-100 w-full my-5"></p>
          {/* Review */}
          <CourseRating />
          <p className="border-b border-black-100 w-full my-5"></p>
          {/* Related */}
          <RelatedCourse categoryId={course?.categoryId} courseId={course?.id} />
        </div>

        <div className="basis-[40%]"></div>
      </div>
    </div>
  );
}
