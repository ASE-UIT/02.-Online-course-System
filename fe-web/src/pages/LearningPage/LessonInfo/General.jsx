import { BookOpenCheck, Smile, Star, UsersRound } from "lucide-react";
import { useSelector } from "react-redux";
const lecTxt = `<p>Chuy&ecirc;n gia tư vấn chiến lược Digital Marketing v&agrave; cung cấp dịch vụ SEO, thiết kế Website v&agrave; đ&agrave;o tạo SEOVới sứ mệnh:&nbsp;+ Gi&uacute;p đỡ c&aacute;c doanh nghiệp Việt Nam triển khai hiệu quả Digital Marketing&nbsp;+ Gi&uacute;p n&acirc;ng tầm kiến thức Digital Marketing cho c&aacute;c bạn trẻ v&agrave; chủ doanh nghiệp+ Gi&uacute;p tạo cầu nối cho nh&agrave; tuyển dụng v&agrave; người lao động trong ng&agrave;nh Digital MarketingTIEN ZIVEN hoạt động dựa tr&ecirc;n nguy&ecirc;n tắc T.I.E.N: Trust &ndash; Improvement &ndash; Effectiveness &ndash; Need+ Trust &ndash; Sự tin tưởng giữa c&aacute;c b&ecirc;n.+ Improvement &ndash; Sự cải thiện&nbsp;+ Effectiveness &ndash; Sự hiệu quả+ Need &ndash; Sự cần thiết</p>`;
export default function General() {
  const { course } = useSelector((state) => state.learning);
  const lecturer = course?.lecturer || null;
  const lecturerStats = course?.lecturerStats || null;
  if (!lecturer && !lecturerStats) return <></>;
  return (
    <div className="mt-[20px]">
      <div className=" flex gap-6">
        <div className="basis-[15%]">
          <p>Giới thiệu khoá học</p>
        </div>
        <div className="basis-[85%]">
          <div dangerouslySetInnerHTML={{ __html: course?.introduction }}></div>
        </div>
      </div>
      <div className="mt-[20px] flex gap-6">
        <div className="basis-[15%]">
          <p>Giảng viên</p>
        </div>
        <div className="basis-[85%]">
          <p className="text-text/lg/semibold text-primary-500">{lecturer.name}</p>
          <p className="text-text/md/regular italic">{lecturer.bio}</p>
          <div className="flex mt-6 gap-8 items-center">
            <div
              className="w-[124px] h-[124px] rounded-full bg-cover"
              style={{
                backgroundImage: `url(${
                  lecturer?.avatar ||
                  "https://s3-alpha-sig.figma.com/img/5641/7762/309a183aa654f1aef9769c111e38197a?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RTRxYdSOAVpFt4DWrw2SW5ixIpLDfBFK2X9aYNHoIrZ2bOglZ84s-pXqWoXfAc-KYeny9BgOPm9nUJL1hxQFDh0fjIECCAQgy83Ig-60LFvpNaU6qGY0ePQ5bxUeLwjfKHof6QgVcBgoBe9OguhpvVVKlvGWYLdJ-6KeUg9XlDvlZekh30STptNhwxR2tE9EBYtsspcdXR8Ut09RYM-e-ymoSk4HCeegLdjVYuY-~TtulMl-XBnhfJedW39X-OEx2vyjKmtH30t-FjqVx67Hp9JY~ErT2cxq80kr7hwW~UlCqIegxw5y8lK0DRtXmAkNrPKgokpPcVFE-9zLmKfy4w__"
                })`,
              }}
            ></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Smile className="w-[20px] h-[20px]" />
                <p className="text-text/md/regular">{lecturerStats.averageRating} xếp hạng</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-[20px] h-[20px]" />
                <p className="text-text/md/regular">{lecturerStats.totalRating} đánh giá</p>
              </div>
              <div className="flex items-center gap-2">
                <UsersRound className="w-[20px] h-[20px]" />
                <p className="text-text/md/regular">{lecturerStats.totalStudents} học viên</p>
              </div>
              <div className="flex items-center gap-2">
                <BookOpenCheck className="w-[20px] h-[20px]" />
                <p className="text-text/md/regular">{lecturerStats.totalCourses} khoá học</p>
              </div>
            </div>
          </div>
          <div className="mt-6" dangerouslySetInnerHTML={{ __html: lecTxt }}></div>
        </div>
      </div>
    </div>
  );
}
