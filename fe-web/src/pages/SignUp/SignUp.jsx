import SignUpIcon from "/picture/signUpIcon.svg";
import { SignUpLine } from "@/assets";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <section className="w-full h-full">
      <div className="flex gap-10 justify-center items-center px-10 py-10 self-stretch bg-gray-100">
        <div className="flex gap-10 w-[1133px] p-10 justify-center items-center border rounded-[40px] bg-white shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)]">
          {/* Image */}
          <div className="hidden lg:w-1/2 relative px-10 py-20 lg:flex flex-1 flex-col justify-center items-center gap-20 self-stretch border rounded-[60px] bg-[linear-gradient(135deg,#FFA209_0%,#FFA209_52.98%,#FFFDEF_100%)]">
            <div className="relative">
              <h2 className="text-display/lg/semibold text-white">
                Tham gia cùng hàng triệu người học với EduHub
              </h2>
              <p className="absolute right-8 mt-2.5 stroke-white stroke-width-3">
                <SignUpLine />
              </p>
            </div>
            <img src={SignUpIcon} alt="SignUpIcon" />
          </div>
          {/* Form */}
          <div className="w-full lg:w-1/2">
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
