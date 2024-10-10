import CategoryCard from "@/components/Category/CategoryCard";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div>
      <div className="w-full mt-[65px] flex h-[400px] bg-primary-color px-24">
        <div className="basis-[40%]">
          <div
            className="w-[223px] h-[307px] bg-contain mx-auto mt-8"
            style={{
              backgroundImage: `url(https://s3-alpha-sig.figma.com/img/6c9b/3735/e27d4216d0bc4c2fb59b453382b29e99?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtXlr9dP0-dkByvnwnkyDWllxUquKz4QZj04S2Sl1zw~4OY4dzbEZa3vk9BYEz-8CyQFHMR0o8ZGGQpxE9Kb13-1AQ7YSeazd13N6MIugGuyj71AGJaz74n9Xz6qpNwMYN~PNrT-eHv6V82~oZeQ7U5-aatyGZks-0R3wDqSvZAwx4AhDvd4z59pN4bjOgu96dxQtAGge70b~Y-jBkxvTeZYBU7fGp1OIb9gNnIb8tlXba65sD45fWjKzhDIHJkKq~0GUbcyEV3hWoGU3Gg1WEcnJY1dXXm4Gl9N3W9ZoZtc3xYy5kuP-VcuozueQRvXD1bkpMhVST-bblUnUyxPsA__)`,
            }}
          ></div>
        </div>
        <div className="basis-[60%] justify-center gap-8 flex flex-col">
          <header className="text-3xl text-white text-display/md/bold">
            Khám Phá Thế Giới Kiến Thức EduHub – Học Tập Mọi Lúc, Mọi Nơi
          </header>
          <p className=" text-white text-text/md/regular">
            Với EduHub, tri thức nằm trong tầm tay bạn dù bạn ở bất kỳ đâu. Bạn
            có thể học tập mọi lúc, trên mọi thiết bị, tiếp cận khoá học từ các
            chuyên gia đầu ngành. Không còn giới hạn về thời gian hay không
            gian, EduHub mang lại một phương pháp học tập linh hoạt và hiện đại,
            giúp bạn chủ động xây dựng hành trình học tập của riêng mình.
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
          <p className="text-text/md/semibold text-primary-500 cursor-pointer">
            Xem tất cả
          </p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CourseCard
                key={idx}
                rating={0}
                ratingNum={2}
                title={"Tiêu đề"}
                author={"Tác giả"}
                price={500000}
                img={
                  "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__"
                }
              ></CourseCard>
            );
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-text/lg/bold">Top bán chạy</p>
          <p className="text-text/md/semibold text-primary-500 cursor-pointer">
            Xem tất cả
          </p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CourseCard
                key={idx}
                rating={0}
                ratingNum={2}
                title={"Tiêu đề"}
                author={"Tác giả"}
                price={500000}
                img={
                  "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__"
                }
              ></CourseCard>
            );
          })}
        </div>
        <div className="flex justify-between mt-6">
          <p className="text-text/lg/bold">Khóa học mới ra mắt</p>
          <p className="text-text/md/semibold text-primary-500 cursor-pointer">
            Xem tất cả
          </p>
        </div>
        <div className="grid grid-cols-4 mt-4  gap-[1rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course, idx) => {
            return (
              <CourseCard
                key={idx}
                rating={0}
                ratingNum={2}
                title={"Tiêu đề"}
                author={"Tác giả"}
                price={500000}
                img={
                  "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__"
                }
              ></CourseCard>
            );
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
                img={
                  "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__"
                }
                key={idx}
              ></CategoryCard>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center">
          <Button className="text-text/md/semibold text-white">
            Xem tất cả
          </Button>
        </div>
      </div>
      <div className="w-full mt-8 px-[15%] h-[355px] bg-[#EEFEE7] flex">
        <div className="basis-[60%] flex flex-col gap-6 justify-center">
          <p className="text-display/md/bold text-success-900">
            Trở thành giảng viên của EduHub
          </p>
          <p className="text-text/md/regular">
            Giảng viên trên toàn thế giới đã và đang dạy cho hàng triệu học viên
            trên EduHub. EduHub cung cấp công cụ và kỹ năng để giúp bạn hoàn
            thiện quá trình giảng dạy tốt hơn.
          </p>
          <div className="bg-[#1F7E0D] px-4 w-fit text-white text-text/md/semibold rounded-md cursor-pointer hover:opacity-90 transition-all py-2">
            Bắt đầu giảng dạy
          </div>
        </div>
        <div className="basis-[40%] flex justify-center items-center">
          <div
            className="w-[223px] h-[250px] bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(https://s3-alpha-sig.figma.com/img/d385/222b/c1f9e16924d9d7758f198407ff983e51?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mL5iBB3Co3foGxeH1nOPDOWtIeUW9o6~ksC~vii9pUceqOHxHlP9KXhHPdjso2XaUhv1XBRz48~YmA7Bt8QvWfUOQKnCbF9ZVbajRTtBgBP8yXnUSGALCgVHs7baUOVdKMnq2pIhyAFL15hwzj7PydaUP2OH9GCZxwA8wAYE1o~eIiATY4LN7N3EGippJoLUtGonIWodNUDy2lO9UG-X4sYD~t31kVscxNmXGAF0ItWqowKM~z-yKCVMQduqPrDtRJffHnfwc-DD9lTHs2xX8cQzkQPJ5AYfqKtCCSnQY8RxjvnqL0UiytVSjI4DlXU200DJZX~WMU~qqbeuvVgt3w__)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
