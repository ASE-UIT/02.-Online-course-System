import SignUpIcon from "/picture/signUpIcon.svg";
import { SignUpLine } from "@/assets";
import { Outlet } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="w-full h-full">
      <div className="flex gap-10 justify-center items-center px-10 py-10 self-stretch bg-gray-100">
        <div className="flex gap-10 w-[1133px] p-10 justify-center items-center border rounded-[40px] bg-white shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)]">
          {/* Image */}
          <div className="hidden lg:w-1/2 relative px-10 py-20 lg:flex flex-1 flex-col justify-center items-center gap-20 self-stretch border rounded-[60px] bg-[linear-gradient(135deg,#FFA209_0%,#FFA209_52.98%,#FFFDEF_100%)]">
            <h2 className="text-display/lg/semibold text-white">
              Tham gia cùng hàng triệu người học với EduHub
            </h2>
            <p className="absolute right-[91.834px] top-[268px] stroke-white stroke-width-3">
              <SignUpLine />
            </p>
            <img src={SignUpIcon} alt="SignUpIcon" />
          </div>
          {/* Form */}
          <div className="w-full lg:w-1/2">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
