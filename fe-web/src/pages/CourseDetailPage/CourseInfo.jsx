import { calculateDiscountPercentage, convertToHoursAndMinutes, formatCurrency } from "@/utils/converter";
import { Award, BookCopy, Clock, Heart, Video } from "lucide-react";

export default function CourseInfo({ course }) {
  return (
    <div
      className="rounded-[4px] mt-[35%] mx-auto w-[450px] h-fit overflow-hidden "
      style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div
        className="w-full bg-no-repeat bg-center bg-cover h-[276px]"
        style={{
          backgroundImage: `url(https://d1csarkz8obe9u.cloudfront.net/posterpreviews/online-course-banner-template-design-119d86c3b79b2aca2c9241e064c7908d_screen.jpg?ts=1644080238)`,
        }}
      ></div>
      <div className="p-[20px] bg-white">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-end gap-2">
            <p className="text-display/md/bold text-primary-500">đ{formatCurrency(course?.sellPrice)}</p>
            <p className="text-text/xl/semibold text-gray-600 line-through">đ{formatCurrency(course?.originalPrice)}</p>
          </div>
          <p className="text-text/xl/regular mt-1">
            Giảm {calculateDiscountPercentage(course?.originalPrice, course?.sellPrice)}%
          </p>
        </div>
        <div className="flex mt-6 gap-2 justify-between">
          <div
            style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
            className="text-warning-950 cursor-pointer select-none  bg-warning-100 flex-1 h-[40px] leading-[40px] text-text/md/semibold rounded-[4px] text-center"
          >
            Thêm vào giỏ hàng
          </div>
          <div
            style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
            className="w-[40px] flex items-center cursor-pointer  justify-center rounded-[4px] h-[40px] "
          >
            <Heart className="w-[24px] h-[24px]" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Video className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">
              Thời lượng:{" "}
              <span className="text-text/md/semibold">{convertToHoursAndMinutes(course?.duration / 60)}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BookCopy className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">
              Giáo trình: <span className="text-text/md/semibold">{course?.lessonParts?.length} bài giảng</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">Sở hữu khóa học trọn đời</p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">Cấp chứng nhận hoàn thành</p>
          </div>
        </div>
        <div
          style={{
            boxShadow: "3px 10px 20px 0px rgba(0, 56, 255, 0.38)",
          }}
          className="text-text/md/semibold text-white bg-primary-500 rounded-[4px] mt-8 cursor-pointer hover:bg-primary-600 transition-all h-[40px] flex items-center justify-center"
        >
          Mua ngay
        </div>
      </div>
    </div>
  );
}
