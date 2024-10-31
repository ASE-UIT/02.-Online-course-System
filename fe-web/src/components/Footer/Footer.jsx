import { FooterIcon } from "@/assets";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isLecturerLayout =
    location.pathname.startsWith("/web/lecturer") ||
    location.pathname.startsWith("/web/sign-in") ||
    location.pathname.startsWith("/web/sign-up");

  if (isLecturerLayout) {
    return null;
  }

  return (
    <footer className="w-full mt-8 px-[15%] h-[355px] bg-[#EEFEE7] flex">
      <div className="basis-[60%] flex flex-col gap-6 justify-center">
        <p className="text-display/md/bold text-success-900">
          Trở thành giảng viên của EduHub
        </p>
        <p className="text-text/md/regular">
          Giảng viên trên toàn thế giới đã và đang dạy cho hàng triệu học viên
          trên EduHub. EduHub cung cấp công cụ và kỹ năng để giúp bạn hoàn thiện
          quá trình giảng dạy tốt hơn.
        </p>
        <div className="bg-[#1F7E0D] px-4 w-fit text-white text-text/md/semibold rounded-md cursor-pointer hover:opacity-90 transition-all py-2">
          Bắt đầu giảng dạy
        </div>
      </div>
      <div className="basis-[40%] flex justify-center items-center">
        <div className="w-[223px] h-[250px] bg-no-repeat bg-contain">
          <FooterIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
