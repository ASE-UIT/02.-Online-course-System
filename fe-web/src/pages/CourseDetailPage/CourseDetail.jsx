import { ArrowDown, ArrowUp, Check, Star } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import CourseInfo from "./CourseInfo";
import LecturerInfo from "./LecturerInfo";
import CourseContent from "./CourseContent";
import { Button } from "@/components/ui/button";
import CourseRating from "@/components/Courses/CourseDetail/CourseRating";
import RelatedCourse from "./RelatedCourse";
import { useState } from "react";
const cousreContent = `<p>Bạn có biết:</p><p>Khóa học "Cẩm nang A-Z Illustrator cho Designer" chính là dành cho bạn, người...</p><p>Đam mê yêu thích đồ họa, nhiếp ảnh, thiết kế sản phẩm.</p><p>Đang đi làm cần bổ sung, chuẩn hóa kiến thức, tăng khả năng hoàn thiện và thăng tiến trong nghề nghiệp</p><p>Sinh viên chuyên ngành marketing, truyền thông, mỹ thuật, thiết đồ họa, thời trang, họa viên… cần kỹ năng sử dụng thành thạo phần mềm illustrator để&nbsp; phục vụ cho công việc và&nbsp;học thiết kế...</p><p>Đang&nbsp;làm việc trong lĩnh vực marketing, truyền thông, kinh doanh,…</p><p>Và bất cứ ai yêu thích công việc sáng tạo và thiết kế với phần mềm Adobe Illustrator!</p><p>Hãy tham gia ngay khóa học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại Unica!</p><p>&nbsp; &nbsp;✔️ Khóa học do giảng viên Phạm Đức Huy trực tiếp hướng dẫn. Khóa học sẽ giúp bạn có được những kiến thức và kỹ năng nền tảng nhất để các bạn tiến gần hơn và&nbsp;trở thành một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nhà!</p><p>&nbsp; &nbsp;✔️ Khóa học là nền tảng để các bạn hiểu sâu hơn về bản chất công cụ của phần mềm Adobe Illustrator, từ đó các bạn dễ dàng xin được việc tại các công ty thiết kế lớn ở Việt Nam.</p><p>&nbsp; &nbsp;✔️ Khóa học được soạn từ những dự án thực tế với nhiều khách hàng, vì vậy tính ứng dụng của khóa học luôn gắn liền với thị trường hiện tại. Học viên có thể ứng dụng ngay những kiến thức và kỹ năng mình học được vào trong công việc hiện tại của bản thân.</p><p>Nội dung khóa học cụ thể:</p><p>Phần 1: Giới thiệu và hướng dẫn tạo các hình khối</p><p>Phần 2: Các tính năng của Shapes và bài tập thực hành</p><p>Phần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes</p><p>Phần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa</p><p>Trở thành nhà thiết kế chuyên nghiệp với phần mềm Ai ngay hôm nay với&nbsp;khóa học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại EduHub thôi nào!</p>`;
export default function CourseDetail() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="mt-[60px]">
      <div
        className="h-[422px] relative bg-no-repeat bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(https://s3-alpha-sig.figma.com/img/6d35/a589/60e373c8cd8dd5b38ca6a1372fe7e7ef?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TTUrQ611g1A3YxHGE6oYvT0o8xF10eEGZz-ah-kotdDGMQ0rJHm2oEMQjnG83tDs6mhL9ZMo1v0B7C-MBDLKZ7DpmscZh2Nt6jtaW2Qvj8YzyyNPNEjI53~wA9-FSAI5wueKVuUKy9T~H5UIBlt7ephirD55h30lAkGRFHfEhJiRheiiAENmGBUvhGAdZzc-q2zHjqJXAgxklaEbJp9~fR8bvI2kuaqWUb9PT7ey1A9qjw2n~vzCfNUwGyilaFTD0bQeNWcyPU1Bo603yG6s0gbMEVhHPDIAA~rQPiXdR4ouWtzzVvhaFDCrZuQvtGwURjDa5YGsfqVxiY0mVM3rDA__)`,
        }}
      >
        <div className="w-full flex  h-full absolute bg-course-ct px-24  gap-12">
          <div className="flex flex-col basis-[60%] h-full justify-end gap-2 pb-12">
            <header className="text-display/md/bold text-white">
              Cẩm nang A-Z Illustrator cho Designer
            </header>
            <p className="text-text/md/regular text-white">
              Giúp bạn nhanh chóng làm chủ phần mềm Adobe Illustrator, cung cấp
              nền tảng kiến thức cơ bản để tạo ra các sản phẩm thiết kế nâng cao
              và chủ động trong thiết kế
            </p>
            <div className="flex items-center gap-4">
              <p className="text-text/md/semibold text-warning-500">4.0</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((el, idx) => {
                  return (
                    <Star
                      key={idx}
                      className="text-warning-500 w-[24px] h-[24px]"
                    />
                  );
                })}
              </div>
              <p className="text-text/md/regular text-white">(n đánh giá)</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-text/md/regular text-white">Giảng viên:</p>
              <p className="text-text/md/semibold text-warning-500 underline">
                Nguyễn Văn A
              </p>
            </div>
          </div>
          <div className="basis-[40%]">
            <CourseInfo />
            <LecturerInfo />
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
              {[1, 2, 3, 4, 5, 6].map((el, idx) => {
                return (
                  <div key={idx} className="flex gap-2 items-start">
                    <Check className="min-w-[24px] mt-[2px] min-h-[24px] text-primary-700 " />
                    <p className="max-w-[312px] text-text/md/regular">
                      Nắm vững được công cụ thiết kế của phần mềm Adobe
                      Illustrator.
                    </p>
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
              className={`${
                showMore ? "h-full " : "h-[400px] "
              } ${showMore ? "animate-scrollDown" : "animate-scrollUp"} p-[20px] pb-0 overflow-hidden mb-9 text-text/lg/regular`}
              dangerouslySetInnerHTML={{ __html: cousreContent }}
            ></div>
            <div
              onClick={() => {
                setShowMore((prev) => !prev);
              }}
              className={`absolute gap-1 flex items-center bottom-[1%] text-success-600 cursor-pointer hover:text-success-700 transition-all px-[20px]`}
            >
              {showMore ? <p>Ẩn bớt</p> : <p>Xem thêm</p>}
              {showMore ? (
                <ArrowUp className="h-[18px] w-[18px]" />
              ) : (
                <ArrowDown className="h-[18px] w-[18px]" />
              )}
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
                <Button className="w-[193px] shadow-box-shadow">
                  Mua ngay
                </Button>
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
          <RelatedCourse />
        </div>

        <div className="basis-[40%]"></div>
      </div>
    </div>
  );
}
