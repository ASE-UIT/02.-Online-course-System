import { ArrowRight } from "lucide-react";
import { HomeIcon } from "@/assets";
import { Link } from "react-router-dom";
export default function HomePageIntro() {
  return (
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
          Với EduHub, tri thức nằm trong tầm tay bạn dù bạn ở bất kỳ đâu. Bạn có
          thể học tập mọi lúc, trên mọi thiết bị, tiếp cận khoá học từ các
          chuyên gia đầu ngành. Không còn giới hạn về thời gian hay không gian,
          EduHub mang lại một phương pháp học tập linh hoạt và hiện đại, giúp
          bạn chủ động xây dựng hành trình học tập của riêng mình.
        </p>
        <div className="text-primary-500 items-center gap-3 flex cursor-pointer transition-all hover:bg-gray-200 text-sm bg-white px-4 py-2 w-fit rounded-[4px] ">
          <Link to={"./sign-in"}>
            <p className="text-text/md/semibold">Tham gia ngay</p>
          </Link>
          <ArrowRight className="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  );
}
