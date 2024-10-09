import { BookOpenCheck, Smile, Star, UsersRound } from "lucide-react";

export default function LecturerInfo() {
  return (
    <div
      style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
      className="w-[450px] mx-auto mt-[25px] p-[20px] rounded-md"
    >
      <div className="flex gap-4">
        <div
          className="w-[70px] bg-cover h-[70px] rounded-full"
          style={{
            backgroundImage: `url(https://s3-alpha-sig.figma.com/img/5641/7762/309a183aa654f1aef9769c111e38197a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jiMaTIthcvw8ReC16VmxsUkY4RXpPlhYdFn87Jk~pBK3XcvJujgKJaDSbR1WGR6Z9Oiwj1kwicxXpr8DR09ZM9hXjbL7cNdGLNJdpATNbCEdc5F3WyLhb9Zu8P8L4LGU0CS~fj-HyFQ5uayr03gwhVKZ1OEqXBIW3HDsf1N5vcQHtjH6UQAupvRK8jwDm9WyVXJlyvdc4v~kWoYcgE3cYr-Kk6EFXWHThkjOKzBYs7MKnrq4YsOGlA8dIN0d~-V~VK~fLX0zuLTEYiImySwK1j6tbbQO5bsQLIG6FeBTb-mF9bcr7ZSqlbmqeqHzQ1A8lIScjF~pOvJeq9ReG~9shQ__)`,
          }}
        ></div>
        <div className="flex-1">
          <p className="text-text/lg/semibold">Nguyễn Văn A</p>
          <p className="text-text/md/regular line-clamp-2 mt-1">
            Người sáng lập ra trung tâm Đào tạo Mỹ thuật đa phương tiện Digital
            Art Pigworkshop
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-3">
        <div className="flex items-center gap-2">
          <Smile className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">4.3 xếp hạng</p>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">300 đánh giá</p>
        </div>
        <div className="flex items-center gap-2">
          <UsersRound className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">2585 học viên</p>
        </div>
        <div className="flex items-center gap-2">
          <BookOpenCheck className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">7 khoá học</p>
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
        className="flex mt-6 items-center justify-center text-text/md/semibold h-[40px] rounded-[4px] "
      >
        Xem chi tiết
      </div>
    </div>
  );
}
