import logo from "@/assets/textLogo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const { learnProgress } = useSelector((state) => state.learning);
  return (
    <div className="h-[60px] bg-white z-[10] fixed top-0 right-0 left-0 flex border-b-[1px] justify-between px-[40px] items-center">
      <p className="text-text/xl/semibold">Tiêu đề khoá học</p>
      <div
        onClick={() => navigate("/web")}
        className="w-[160px] h-[40px] justify-center items-center flex cursor-pointer"
      >
        <div
          className="w-[100px] h-[25px] bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
      </div>
      <p className="text-text/md/regular">Đã học {learnProgress.totalCompleteLesson}/{learnProgress.totalLesson} khoá học</p>
    </div>
  );
}
