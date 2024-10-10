import { Award, BookCopy, Clock, Heart, Video } from "lucide-react";

export default function CourseInfo() {
  return (
    <div
      className="rounded-[4px] mt-[35%] mx-auto w-[450px] h-fit overflow-hidden "
      style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div
        className="w-full bg-no-repeat bg-center bg-cover h-[276px]"
        style={{
          backgroundImage: `url(https://s3-alpha-sig.figma.com/img/577c/6528/ddf41450ca653083d12880f4c574cebb?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TFyXXQfrC-gneKCaqPkM0BWPsStYenJpNHMkgtJu4pEPTuBQnqmSYh448Nquf~1Up7GikOp3BSWl6QZ5gXiWjb8Ul4bzyHkwoMFjZgL-VbPQnftuk3zRslugUPa6uIngBspYEhQypdrvJKX9wT3Q98MqR7glV1anccoGYRcZ7nIi1p6dWmy0tRT4TTcez0udY6pVO23VMzt57HroncUfcVwEzenl0ed1iQzZMqOXWAxsPM9OkDEdacD~knmp141N1XwiDnQucGuS6o62T9t~PA5dBKP1HRqpxu2vS0SWSs3ltvOZMj~TOtLRk73u60yVhyrHl0ESjO5HspLer21R0g__)`,
        }}
      ></div>
      <div className="p-[20px] bg-white">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-end gap-2">
            <p className="text-display/md/bold text-primary-500">đ000,000</p>
            <p className="text-text/xl/semibold text-gray-600 line-through">
              đ000,000
            </p>
          </div>
          <p className="text-text/xl/regular mt-1">Giảm xx%</p>
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
              <span className="text-text/md/semibold">05 giờ 30 phút</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BookCopy className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">
              Giáo trình:{" "}
              <span className="text-text/md/semibold">41 bài giảng</span>
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
