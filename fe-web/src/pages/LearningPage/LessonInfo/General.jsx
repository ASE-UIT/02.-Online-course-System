import { BookOpenCheck, Smile, Star, UsersRound } from "lucide-react";
import { useSelector } from "react-redux";
const lecTxt = `<p>Chuy&ecirc;n gia tư vấn chiến lược Digital Marketing v&agrave; cung cấp dịch vụ SEO, thiết kế Website v&agrave; đ&agrave;o tạo SEOVới sứ mệnh:&nbsp;+ Gi&uacute;p đỡ c&aacute;c doanh nghiệp Việt Nam triển khai hiệu quả Digital Marketing&nbsp;+ Gi&uacute;p n&acirc;ng tầm kiến thức Digital Marketing cho c&aacute;c bạn trẻ v&agrave; chủ doanh nghiệp+ Gi&uacute;p tạo cầu nối cho nh&agrave; tuyển dụng v&agrave; người lao động trong ng&agrave;nh Digital MarketingTIEN ZIVEN hoạt động dựa tr&ecirc;n nguy&ecirc;n tắc T.I.E.N: Trust &ndash; Improvement &ndash; Effectiveness &ndash; Need+ Trust &ndash; Sự tin tưởng giữa c&aacute;c b&ecirc;n.+ Improvement &ndash; Sự cải thiện&nbsp;+ Effectiveness &ndash; Sự hiệu quả+ Need &ndash; Sự cần thiết</p>`;
const txt = `<p data-pm-slice="0 0 []"><strong>Bạn c&oacute; biết:</strong><br />Kh&oacute;a học "Cẩm nang A-Z Illustrator cho Designer" ch&iacute;nh l&agrave; d&agrave;nh cho bạn, người...<br />Đam m&ecirc; y&ecirc;u th&iacute;ch đồ họa, nhiếp ảnh, thiết kế sản phẩm.<br />Đang đi l&agrave;m cần bổ sung, chuẩn h&oacute;a kiến thức, tăng khả năng ho&agrave;n thiện v&agrave; thăng tiến trong nghề nghiệp<br />Sinh vi&ecirc;n chuy&ecirc;n ng&agrave;nh marketing, truyền th&ocirc;ng, mỹ thuật, thiết đồ họa, thời trang, họa vi&ecirc;n&hellip; cần kỹ năng sử dụng th&agrave;nh thạo phần mềm illustrator để&nbsp; phục vụ cho c&ocirc;ng việc v&agrave;&nbsp;học thiết kế...<br />Đang&nbsp;l&agrave;m việc trong lĩnh vực marketing, truyền th&ocirc;ng, kinh doanh,&hellip;<br />V&agrave; bất cứ ai y&ecirc;u th&iacute;ch c&ocirc;ng việc s&aacute;ng tạo v&agrave; thiết kế với phần mềm Adobe Illustrator!<br />H&atilde;y tham gia ngay kh&oacute;a học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại Unica!<br />&nbsp; &nbsp;✔️ Kh&oacute;a học do giảng vi&ecirc;n Phạm Đức Huy trực tiếp hướng dẫn. Kh&oacute;a học sẽ gi&uacute;p bạn c&oacute; được những kiến thức v&agrave; kỹ năng nền tảng nhất để c&aacute;c bạn tiến gần hơn v&agrave;&nbsp;trở th&agrave;nh một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nh&agrave;!<br />&nbsp; &nbsp;✔️ Kh&oacute;a học l&agrave; nền tảng để c&aacute;c bạn hiểu s&acirc;u hơn về bản chất c&ocirc;ng cụ của phần mềm Adobe Illustrator, từ đ&oacute; c&aacute;c bạn dễ d&agrave;ng xin được việc tại c&aacute;c c&ocirc;ng ty thiết kế lớn ở Việt Nam.<br />&nbsp; &nbsp;✔️ Kh&oacute;a học được soạn từ những dự &aacute;n thực tế với nhiều kh&aacute;ch h&agrave;ng, v&igrave; vậy t&iacute;nh ứng dụng của kh&oacute;a học lu&ocirc;n gắn liền với thị trường hiện tại. Học vi&ecirc;n c&oacute; thể ứng dụng ngay những kiến thức v&agrave; kỹ năng m&igrave;nh học được v&agrave;o trong c&ocirc;ng việc hiện tại của bản th&acirc;n.<br />Nội dung kh&oacute;a học cụ thể:<br />Phần 1: Giới thiệu v&agrave; hướng dẫn tạo c&aacute;c h&igrave;nh khối<br />Phần 2: C&aacute;c t&iacute;nh năng của Shapes v&agrave; b&agrave;i tập thực h&agrave;nh<br />Phần 3: Hướng dẫn c&aacute;c c&ocirc;ng cụ Drawing Tools, Pen Tool v&agrave; Brushes<br />Phần 4: Hướng dẫn c&aacute;c c&ocirc;ng cụ n&acirc;ng cao trong thiết kế đồ họa<br />Trở th&agrave;nh nh&agrave; thiết kế chuy&ecirc;n nghiệp với phần mềm Ai ngay h&ocirc;m nay với&nbsp;kh&oacute;a học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại EduHub th&ocirc;i n&agrave;o!</p>`;
export default function General() {
  const { course } = useSelector((state) => state.learning);
  const lecturer = course?.lecturer || null;
  if (!lecturer) return <></>;
  return (
    <div className="mt-[20px]">
      <div className=" flex gap-6">
        <div className="basis-[15%]">
          <p>Giới thiệu khoá học</p>
        </div>
        <div className="basis-[85%]">
          <div dangerouslySetInnerHTML={{ __html: txt }}></div>
        </div>
      </div>
      <div className="mt-[20px] flex gap-6">
        <div className="basis-[15%]">
          <p>Giảng viên</p>
        </div>
        <div className="basis-[85%]">
          <p className="text-text/lg/semibold text-primary-500">
            {lecturer.name}
          </p>
          <p className="text-text/md/regular italic">{lecturer.bio}</p>
          <div className="flex mt-6 gap-8 items-center">
            <div
              className="w-[124px] h-[124px] rounded-full bg-cover"
              style={{
                backgroundImage: `url(https://s3-alpha-sig.figma.com/img/5641/7762/309a183aa654f1aef9769c111e38197a?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gtlKAshVvgQFjbAgbNr3ddFdRY5KQAE-UYivYe0wTyg-hLWt2xWkMoWYndnqsqGOuDKT0PBf4xyvtf-16TuZUH4~5yf6wJVzRkWvsGxuf2OCvbOkYKgvREXPyaoIYPHYQEW-m-P17---DOAJaLesG9kJZiRapvOcYlV-Q~IP8Ka2xmf8mY~X4fk2yYEJcAZto1I71aQ5J2NNCqvSbJvFhrp1xdGT~LLZ2UO6GGjI6DCEsGATO2T5cfGG3tDswJPTzQe3i4HlinNu86NiqvZ-YM6PkyOSUVCmcC4CxhEDxtJNFAORv-aVCvOSj0NsMF9eckLuqa-Cg4DYtLQr2qeUIQ__)`,
              }}
            ></div>
            <div className="flex flex-col gap-2">
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
          </div>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: lecTxt }}
          ></div>
        </div>
      </div>
    </div>
  );
}
