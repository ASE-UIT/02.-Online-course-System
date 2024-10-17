import CategoryCard from "@/components/Category/CategoryCard";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HomeIcon } from "@/assets";
import CourseCardIcon from "/picture/CourseCardIcon.svg";

const Home = () => {
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
                img={CourseCardIcon}
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
    </div>
  );
};

export default Home;
