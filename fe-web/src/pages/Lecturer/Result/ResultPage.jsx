import { Link } from "react-router-dom";
import { LecturerSuccessIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks";

function ResultPage() {
  useScrollToTop();

  return (
    <section className="w-full h-screen">
      <section className="pt-20 flex gap-10 justify-center items-center px-10 py-10 self-stretch bg-gray-100">
        <div className="flex gap-10 p-10 justify-center items-center border rounded-[40px] bg-white shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)]">
          <div className="flex flex-col px-10 items-center text-center space-y-4">
            <div className="text-green-500">
              <LecturerSuccessIcon />
            </div>

            <h1 className="text-2xl font-bold text-display/lg/semibold">
              Cảm ơn bạn đã đăng ký!
            </h1>

            <div>
              <p className="text-text/md/regular text-black-500">
                Chúng tôi đang xét duyệt yêu cầu của bạn, vui lòng chờ phản hồi
                từ chúng tôi.
              </p>

              <p className="text-text/md/regular text-black-500">
                Chúng tôi sẽ cố gắng trả lời bạn sớm nhất có thể.
              </p>
            </div>

            <Link to={"/web/"}>
              <Button className="w-[240px] mt-5 rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]">
                Trở lại trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ResultPage;
