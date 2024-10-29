import { useParams, Link } from "react-router-dom";
import { ResultIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks";

const DefaultTitle = "Tạo tài khoản thành công!";
const PhoneTitle = "Xác thực số điện thoại thành công!";
const EmailTitle = "Xác thực email thành công!";

function ResultPage() {
  useScrollToTop();
  const { content } = useParams();
  const title =
    content === "phone"
      ? PhoneTitle
      : content === "email"
      ? EmailTitle
      : DefaultTitle;

  return (
    <section className="w-full h-screen">
      <section className="pt-20 flex gap-10 justify-center items-center px-10 py-10 self-stretch bg-gray-100">
        <div className="flex gap-10 p-10 justify-center items-center border rounded-[40px] bg-white shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)]">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="text-green-500">
              <ResultIcon />
            </div>

            <h1 className="text-2xl font-bold text-display/lg/semibold">
              {title}
            </h1>

            <div>
              <p className="text-text/md/regular text-black-500">
                Tài khoản của bạn đã được tạo.
              </p>

              <p className="text-text/md/regular text-black-500">
                Vui lòng đăng nhập để bắt đầu hành trình tri thức của bạn!
              </p>
            </div>

            <Link to={"/web/sign-in"}>
              <Button className="w-[240px] mt-5 rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]">
                Đăng nhập ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ResultPage;
